import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";
import DatePicker from "react-datepicker";
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
import { userProfileAtom } from "../../atom/sideBarAtom";
import CustomPagination from "../../components/CustomPagination";

const Gallery = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchGallery, setSearchGallery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const [previewImages, setPreviewImages] = useState([]); // 프리뷰 보여줄 이미지 데이터
  const [severImages, setSeverImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [render, setRender] = useState(true);
  const [title, setTitle] = useState("");
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const [imageUrlList, setImageUrlList] = useState([]);
  const userRole = useRecoilValue(userProfileAtom);

  const { data } = useQuery(
    [
      "classesGallery",
      searchGallery,
      currentPage,
      id,
      formattedEndDate,
      formattedStartDate,
    ],
    () => {
      if (searchGallery) {
        return MemberAPI.getSearchGallery(searchGallery, id, currentPage);
      } else if (formattedEndDate || formattedStartDate) {
        return MemberAPI.getSearchDateGallery(
          id,
          formattedStartDate,
          formattedEndDate,
          currentPage
        );
      } else {
        return MemberAPI.getClassesGallery(id, currentPage);
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
    setSearchGallery(e.target.value);
    queryClient.invalidateQueries(["classesGallery", searchGallery]);
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
    setStartDate("");
    setEndDate("");
  };

  //모달 갤러리 저장하기 기능
  const handleGallerySubmit = async (id) => {
    const formData = new FormData();
    severImages.forEach((image) => {
      formData.append("imageList[]", image);
    });
    formData.append("title", title);

    const payload = {
      id: id,
      formData: formData,
    };
    setGallerySubmitMutation.mutate(payload);
    setPreviewImages([]);
    setSeverImages([]);
    await setTitle("");
    closeModal();
  };

  // 사진 등록 모달 부분
  const uploadFile = (event) => {
    const fileArr = event.target.files;
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
    }
    else
      return `${baseHeight}px`;
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
  };


  const createGallery = () => {
    openModal(modalData);
  };

  useEffect(() => {
    if (!render) {
      createGallery();
    } else {
      setRender(false);
    }
  }, [previewImages]);

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
      contents: (
        <>
          {!modalState.isOpen ? (
            <StyledModalContent>
              {response?.data.data.imageUrlList.map((item) => {
                return (
                  <StyledAddGallery key={item}>
                    <StyledPreviewImage src={item} />
                  </StyledAddGallery>
                );
              })}
            </StyledModalContent>
          ) : (
            modalState.contents
          )}
        </>
      ),
      footer: (
        <>
          {/* <Buttons.Filter
            colorTypes="primary"
            onClick={() => handleClickModify(response)}
          >
            수정하기
          </Buttons.Filter> */}
        </>
      ),
      width: "900px",
      height: calculateModalHeight(response?.data.data.imageUrlList.length),
      callback: () => alert("modal"),
    };
  };

  const getDetailGallery = (imageId) => {
    const payload = {
      id: id,
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
      contents: (
        <StyledModalContent>
          {response?.data.data.imageUrlList.map((item) => {
            return (
              <StyledAddGallery key={item}>
                <StyledPreviewImage src={item} />
              </StyledAddGallery>
            );
          })}
        </StyledModalContent>
      ),
      width: "900px",
      height: calculateModalHeight(response?.data.data.imageUrlList.length),
    }));
  };
  useEffect(() => {
    console.log(imageUrlList);
  }, [imageUrlList]);

  //갤러리 모달에서 이미지 추가
  const handleImageEdit = (newImages) => {
    const updatedImages = Array.from(newImages).map((image) =>
      URL.createObjectURL(image)
    );
    setImageUrlList((prevState) => [...prevState, ...updatedImages]);
  };
  //갤러리 삭제
  const handleGalleryDelete = (imageId) => {
    const payload = {
      id: id,
      imageId: imageId,
    };
    removeGalleryMutation.mutate(payload);
    closeModal();
  };

  return (
    <>
      <StyledGalleryWrapper>
        <StyledGalleryHeader>
          <Buttons.Filter outlined onClick={handleEntireDate}>
            전체기간
          </Buttons.Filter>
          <StyledDatePickerWrapper>
            <StyledDatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </StyledDatePickerWrapper>
          ~
          <StyledDatePickerWrapper>
            <StyledDatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
            />
          </StyledDatePickerWrapper>
          <Buttons.Filter colorTypes="primary" onClick={handleDateSearch}>
            적용하기
          </Buttons.Filter>
          {userRole.role === "PRINCIPAL" || userRole.role === "TEACHER" ? (
            <SyledAddGalleryButton onClick={createGallery}>
              사진 등록
            </SyledAddGalleryButton>
          ) : null}
          <StyledSearchWrapper>
            <StyledGallerySearchInput onChange={handleSearch} />
            <StyledInputIcon />
          </StyledSearchWrapper>{" "}
        </StyledGalleryHeader>
        <StyledGalleryContainer>
          {data?.data.data.imagePostResponseDtoList.map((item) => {
            return (
              <StyledGalleryCard
                key={item.imagePostId}
                onClick={() => getDetailGallery(item.imagePostId)}
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
        <StyledPaginationContainer>
          {data?.data.data.imagePostCount !== 0 ? (
            <CustomPagination
              current={currentPage}
              pageSize="12"
              total={data?.data.data.imagePostCount}
              onChange={(page) => setCurrentPage(page)}
            />
          ) : null}
        </StyledPaginationContainer>
      </StyledGalleryWrapper>
      <Modal />
    </>
  );
};

export default Gallery;

const StyledGalleryWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(6 * (225px + 18px));
  height: 748px;
  background: rgba(237, 245, 238, 0.8);
  border-radius: 12px;

  @media (max-width: 1800px) {
    width: calc(6 * (170px + 10px));
    height: 650px;
  }
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
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const StyledGalleryContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledGalleryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  width: 216px;
  height: 286px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 10px;

  @media (max-width: 1800px) {
    width: 185px;
    height: 250px;
  }
`;

const StyledGalleryImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 4px;

  @media (max-width: 1800px) {
    width: 145px;
    height: 130px;
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

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
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

const StyledModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
  max-height: 640px;
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

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  padding: 10px;
  border-radius: 4px;
  margin-left: 7px;
  width: 124px;
  height: 32px;
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
`;

const StyledDatePickerWrapper = styled.div`
  margin-right: 7px;
`;

const SyledAddGalleryButton = styled.button`
  margin-left: auto;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.white};
  padding: 4px 10px;
  gap: 10px;
  color: ${({ theme }) => theme.color.primary};
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
  margin:20px;
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
`;

const StyledInputIcon = styled(AiOutlineSearch)`
  position: absolute;
  right: 15px;
`;
