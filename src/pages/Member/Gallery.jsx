import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MemberAPI } from "../../api/MemberAPI";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import { IoIosAdd } from "react-icons/io";
import { AiFillAppstore, AiOutlineSearch } from "react-icons/ai";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";
import { GallerySlider } from "./ClassModal";
import { useRecoilValue, useRecoilState } from "recoil";
import { modalAtom } from "../../atom/modalAtoms";
import { kindergartenAtom, userProfileAtom } from "../../atom/sideBarAtom";
import CustomPagination from "../../components/CustomPagination";
import CustomDatepicker from "../../components/CustomDatepicker";
import { GalleryDetail } from "./GalleryModal";

const Gallery = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchGallery, setSearchGallery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const [previewImages, setPreviewImages] = useState([]); // 프리뷰 보여줄 이미지 데이터
  const [severImages, setSeverImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [render, setRender] = useState(true);
  const [title, setTitle] = useState("");
  const [isGalleryAdd, setIsGalleryAdd] = useState(false);
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const userRole = useRecoilValue(userProfileAtom);
  const kindergartenId = useRecoilValue(kindergartenAtom);

  const { data } = useQuery(
    [
      "classesGallery",
      kindergartenId.id,
      searchGallery,
      currentPage,
      id || "-1",
      formattedEndDate,
      formattedStartDate,
    ],
    () => {
      if (searchGallery) {
        return MemberAPI.getSearchGallery(
          kindergartenId.id,
          searchGallery,
          id || "-1",
          currentPage
        );
      } else if (formattedEndDate || formattedStartDate) {
        return MemberAPI.getSearchDateGallery(
          kindergartenId.id,
          id || "-1",
          formattedStartDate,
          formattedEndDate,
          currentPage
        );
      } else {
        return MemberAPI.getClassesGallery(
          kindergartenId.id,
          id || "-1",
          currentPage
        );
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const detailGalleryMutation = useMutation(MemberAPI.getDetailGallery, {
    onSuccess: (response) => {
      const GalleryModalData = createGalleryModalData(response);
      openModal(GalleryModalData);
      console.log(response);
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const setGallerySubmitMutation = useMutation(MemberAPI.setGallerySubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("classesGallery");
    },
  });

  const removeGalleryMutation = useMutation(MemberAPI.removeGallery, {
    onSuccess: () => {
      queryClient.invalidateQueries("classesGallery");
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      setSearchGallery(inputValue);
      queryClient.invalidateQueries(["classesGallery", searchGallery]);
    }
  };

  //날짜변환
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  //날짜 검색 기능
  const handleDateSearch = () => {
    if (startDate === "" || endDate === "") {
      alert("기간을 선택해주세요");
    } else {
      setFormattedStartDate(dateToString(startDate));
      setFormattedEndDate(dateToString(endDate));
    }
  };

  //전체기간 조회
  const handleEntireDate = () => {
    setFormattedStartDate("2000-01-01");
    setFormattedEndDate("3000-01-01");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  //모달 갤러리 저장하기 기능
  const handleGallerySubmit = async (id) => {
    if (title && severImages.length > 0) {
      const formData = new FormData();
      severImages.forEach((image) => {
        formData.append("imageList[]", image);
      });
      formData.append("title", title);

      const payload = {
        kindergartenId: kindergartenId.id,
        id: id || "-1",
        formData: formData,
      };
      setGallerySubmitMutation.mutate(payload);
      setPreviewImages([]);
      setSeverImages([]);
      await setTitle("");
      closeModal();
    } else {
      alert("제목과 사진을 다 입력해주세요");
    }
  };

  // 사진 등록 모달 부분
  const uploadFile = (event) => {
    const fileArr = event.target.files;

    if (fileArr.length > 10) {
      alert("최대 10개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    setSeverImages((prevSeverImages) => [
      ...prevSeverImages,
      ...Array.from(fileArr),
    ]);

    const filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      const file = fileArr[i];
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prevPreviewImages) => [
          ...prevPreviewImages,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    }
  };
  //갤러리 추가 동적 높이 함수
  const calculateModalHeight = (previewImagesLength) => {
    const baseHeight = 598;
    const addHeight = 598 + 320;

    if (previewImagesLength > 1) {
      return `${addHeight}px`;
    } else return `${baseHeight}px`;
  };

  const modalData = {
    title: (
      <>
        <StyledGalleryModalHeader>갤러리 등록</StyledGalleryModalHeader>
        <StyledGalleryModalTitleBox>
          <StyledModalInputBox
            type="text"
            placeholder="제목을 작성해주세요"
            onChange={(e) => setTitle(e.target.value)}
          ></StyledModalInputBox>
        </StyledGalleryModalTitleBox>
      </>
    ),
    contents: (
      <StyledGridModalContent itemCount={previewImages.length}>
        <StyledAddGallery>
          <StyledAddFont htmlFor="upload-img" id="upload-img-label">
            <StyledAddIcon />
            <StyledAddInput
              type="file"
              name="upload-img"
              id="upload-img"
              accept="image/*"
              aria-hidden="false"
              tabIndex="0"
              multiple
              onChange={uploadFile}
            />
            사진추가
          </StyledAddFont>
        </StyledAddGallery>
        {previewImages.map((item) => {
          return (
            <StyledAddGallery key={item}>
              <StyledPreviewImage src={item} />
            </StyledAddGallery>
          );
        })}
      </StyledGridModalContent>
    ),
    footer: (
      <>
        <Buttons.Filter
          colorTypes="primary"
          onClick={(e) => handleGallerySubmit(id)}
        >
          저장하기
        </Buttons.Filter>
      </>
    ),
    width: "900px",
    height: calculateModalHeight(previewImages.length),
    callback: () => alert("modal"),
    onClose: () => {
      setIsGalleryAdd(false);
      setPreviewImages([]);
      setSeverImages([]);
    },
  };

  const createGallery = () => {
    setIsGalleryAdd(true);
    openModal(modalData);
  };

  useEffect(() => {
    if (!render && isGalleryAdd) {
      createGallery();
    } else {
      setRender(false);
    }
  }, [previewImages, isGalleryAdd, title]);

  //사진 상세조회 부분 및 프레임 전환
  const createGalleryModalData = (response) => {
    return {
      title: (
        <>
          <StyledGalleryModalHeader>갤러리</StyledGalleryModalHeader>
          <StyledModalTitle>{response?.data.data.title}</StyledModalTitle>
          <StyledGalleryDualModalWrapper>
            <StyledModalDate>{response?.data.data.createdAt}</StyledModalDate>
            <StyledButtonWrapper>
              <StyledSlideIcon onClick={() => handleClickSlide(response)} />
              <StyledSplitIcon onClick={() => handleClickSplit(response)} />
            </StyledButtonWrapper>
          </StyledGalleryDualModalWrapper>
        </>
      ),
      contents: <GalleryDetail response={response} />,
      footer: (
        <>
          {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
            <Buttons.Filter
              colorTypes="primary"
              onClick={() => handleGalleryDelete(response)}
            >
              삭제하기
            </Buttons.Filter>
          ) : null}
        </>
      ),
      width: "900px",
      height: calculateModalHeight(response?.data.data.imageUrlList.length),
      callback: () => alert("modal"),
    };
  };

  const getDetailGallery = (imageId) => {
    const payload = {
      kindergartenId: kindergartenId.id,
      id: id || "-1",
      imageId: imageId,
    };
    detailGalleryMutation.mutate(payload);
  };

  const handleClickSlide = (response) => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: true,
      title: (
        <>
          <StyledGalleryModalHeader>갤러리</StyledGalleryModalHeader>
          <StyledModalTitle>{response?.data.data.title}</StyledModalTitle>
          <StyledGalleryDualModalWrapper>
            <StyledModalDate>{response?.data.data.createdAt}</StyledModalDate>
            <StyledButtonWrapper>
              <StyledSlideIcon
                color="#3cc678"
                onClick={() => handleClickSlide(response)}
              />
              <StyledSplitIcon
                color="#d9d9d9"
                onClick={() => handleClickSplit(response)}
              />
            </StyledButtonWrapper>
          </StyledGalleryDualModalWrapper>
        </>
      ),
      contents: (
        <GallerySlider images={response?.data?.data?.imageUrlList || []} />
      ),
      width: "900px",
      height: "598px",
    }));
  };

  const handleClickSplit = (response) => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: true,
      title: (
        <>
          <StyledGalleryModalHeader>갤러리</StyledGalleryModalHeader>
          <StyledModalTitle>{response?.data.data.title}</StyledModalTitle>
          <StyledGalleryDualModalWrapper>
            <StyledModalDate>{response?.data.data.createdAt}</StyledModalDate>
            <StyledButtonWrapper>
              <StyledSlideIcon onClick={() => handleClickSlide(response)} />
              <StyledSplitIcon onClick={() => handleClickSplit(response)} />
            </StyledButtonWrapper>
          </StyledGalleryDualModalWrapper>
        </>
      ),
      contents: <GalleryDetail response={response} />,
      width: "900px",
      height: calculateModalHeight(response?.data.data.imageUrlList.length),
    }));
  };

  //갤러리 삭제
  const handleGalleryDelete = (respone) => {
    const payload = {
      kindergartenId: kindergartenId.id,
      id: id || "-1",
      imageId: respone.data.data.imagePostId,
    };
    removeGalleryMutation.mutate(payload);
    closeModal();
  };

  return (
    <>
      <StyledGalleryWrapper>
        <StyledGalleryHeader>
          <StyledHeaderLeftWrapper>
            <Buttons.Filter outlined onClick={handleEntireDate}>
              전체기간
            </Buttons.Filter>
            <StyledDateBox marginLeft="14px" marginRight="4px">
              <CustomDatepicker
                selectedDate={startDate}
                onDateChange={(date) => setStartDate(date)}
              />
              {startDate.getFullYear()}.{startDate.getMonth() + 1}.
              {startDate.getDate()}
            </StyledDateBox>
            ~
            <StyledDateBox marginLeft="4px" marginRight="8px">
              <CustomDatepicker
                selectedDate={endDate}
                onDateChange={(date) => setEndDate(date)}
              />
              {endDate.getFullYear()}.{endDate.getMonth() + 1}.
              {endDate.getDate()}
            </StyledDateBox>
            <Buttons.Filter colorTypes="primary" onClick={handleDateSearch}>
              적용하기
            </Buttons.Filter>
          </StyledHeaderLeftWrapper>
          <StyledHeaderRightWrapper>
            {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
              <SyledAddGalleryButton onClick={createGallery}>
                사진 등록
              </SyledAddGalleryButton>
            ) : null}
            <StyledSearchWrapper>
              <StyledGallerySearchInput onChange={handleSearch} />
              <StyledInputIcon />
            </StyledSearchWrapper>{" "}
          </StyledHeaderRightWrapper>
        </StyledGalleryHeader>

        <StyledGalleryContainer>
          {data?.data.data.imagePostResponseDtoList.map((item) => {
            return (
              <StyledGalleryCard
                key={item.imagePostId}
                onClick={() => getDetailGallery(item.imagePostId)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <StyledGalleryImage src={item.imageUrlList} />
                <StyledTitleFont>{item.title}</StyledTitleFont>
                <StyledFont>
                  <StyledDateFont>{item.createdAt}</StyledDateFont>
                </StyledFont>
              </StyledGalleryCard>
            );
          })}
        </StyledGalleryContainer>
        {data?.data.data.imagePostCount !== 0 ? (
          <CustomPagination
            current={currentPage}
            pageSize="12"
            total={data?.data.data.imagePostCount}
            onChange={(page) => setCurrentPage(page)}
          />
        ) : null}
      </StyledGalleryWrapper>
      <Modal />
    </>
  );
};

export default Gallery;

const StyledGalleryWrapper = styled.div`
  padding: 20px;
  background: rgba(237, 245, 238, 0.8);
  border-radius: 12px;
`;
const StyledGridModalContent = styled.div`
  display: ${({ itemCount }) => (itemCount > 0 ? "grid" : "flex")};
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  /* grid-auto-rows: minmax(100px, auto); */
  grid-gap: 10px;
  margin: 10px 84px;
  overflow-y: auto;
  max-height: 640px;
`;

const StyledGalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 10px;
`;
const StyledHeaderLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledHeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SyledAddGalleryButton = styled.button`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.white};
  padding: 4px 10px;
  color: ${({ theme }) => theme.color.primary};
  gap: 10px;
  cursor: pointer;

  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.grayScale[50]};
  }
  &:active {
    cursor: grabbing;
  }
`;

const StyledGalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  margin-left: 24px;
  margin-right: auto;
  margin-top: 24px;
  gap: 8.8px;
`;

const StyledGalleryCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  width: 185px;
  height: 250px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 8px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 185px;
    height: 250px;
    padding: 20px;
  }
  @media ${({ theme }) => theme.device.desktop} {
    width: 216px;
    height: 286px;
  }
`;

const StyledGalleryImage = styled.img`
  width: 145px;
  height: 130px;
  border-radius: 4px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 145px;
    height: 130px;
  }
  @media ${({ theme }) => theme.device.desktop} {
    width: 180px;
    height: 180px;
  }
`;

const StyledTitleFont = styled.div`
  ${textVariants.Body1_SemiBold}
  width: auto;
  height: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.grayScale[600]}; ;
`;

const StyledDateFont = styled.div`
  ${textVariants.Body3_SemiBold}
  width: auto;
  height: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.grayScale[500]}; ;
`;

const StyledFont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledAddIcon = styled(IoIosAdd)`
  width: 66px;
  height: 66px;
  background-color: ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 60px;
  color: ${({ theme }) => theme.color.grayScale[500]};
`;

const StyledSplitIcon = styled(AiFillAppstore)`
  width: 28px;
  height: 28px;
  color: ${({ color }) => color || "#3cc678"};
`;

const StyledSlideIcon = styled.div`
  width: 21px;
  height: 21px;
  background: ${({ color }) => color || "#d9d9d9"};
`;

const StyledAddGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 320px;
  border-radius: 8px;
`;

const StyledAddFont = styled.label`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.grayScale[400]};
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledAddInput = styled.input`
  display: none;
`;

const StyledPreviewImage = styled.img`
  width: 360px;
  height: 320px;
  border-radius: 8px;
  margin-top: 30px;
`;

const StyledGallerySearchInput = styled.input`
  width: 200px;
  height: 32px;
  margin-left: 12px;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
`;

const StyledGalleryModalHeader = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const StyledGalleryModalTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 8.8px;
  border-bottom: 2px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const StyledGalleryDualModalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  gap: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const StyledModalTitle = styled.div`
  ${textVariants.H3_SemiBold}
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 0px 12px;
  width: 780px;
  height: 30px;
  color: ${({ theme }) => theme.color.grayScale[600]};
  background-color: ${({ theme }) => theme.color.grayScale[50]};
`;

const StyledModalDate = styled.div`
  ${textVariants.Body3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-top: 15px;
`;

const StyledModalInputBox = styled.input`
  width: 570px;
  height: 30px;
  border: 0;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => theme.color.grayScale[50]};
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  float: right;
`;

const StyledSearchWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 200px;
  height: 32px;
  margin-left: auto;
`;

const StyledInputIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 15px;
`;

const StyledDateBox = styled.div`
  ${textVariants.Body1_SemiBold}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 4px;
  width: 124px;
  height: 32px;
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.primary};
  margin-right: ${({ marginRight }) => marginRight};
  margin-left: ${({ marginLeft }) => marginLeft};
`;
