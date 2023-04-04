import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MemberAPI } from "../../api/MemberAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import { IoIosAdd } from "react-icons/io";
import Buttons from "../../components/Buttons";
import textVariants from "../../styles/variants/textVariants";

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
  const [imageId, setImageId] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);

  const { data } = useQuery(
    ["classesGallery", searchGallery, currentPage],
    () => {
      if (searchGallery) {
        return MemberAPI.getSearchGallery(
          searchGallery,
          id,
          currentPage,
          itemsPerPage
        );
      }
      return MemberAPI.getSearchDateGallery(
        id,
        startDate,
        endDate,
        currentPage,
        itemsPerPage
      );
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const { data: DetailGallery } = useQuery(
    ["getDetailGallery", id, imageId],
    () => MemberAPI.getDetailGallery(id, imageId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
      enabled: false,
    }
  );

  const setGallerySubmitMutation = useMutation(MemberAPI.setGallerySubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("classesGallery");
    },
  });

  const itemsPerPage = 12;

  const totalItems = 12;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchGallery(e.target.value);
    queryClient.invalidateQueries(["classesGallery", searchGallery]);
    console.log(data);
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
    setFormattedStartDate(dateToString(startDate));
    setFormattedEndDate(dateToString(endDate));
    console.log(formattedStartDate, formattedEndDate);
    return MemberAPI.getSearchDateGallery(
      id,
      formattedStartDate,
      formattedEndDate
    );
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
    setTimeout(() => {
      closeModal();
    }, 0);
    console.log(formData);
    for (const keyValue of formData) console.log(keyValue);
  };

  // 모달 부분
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
        console.log(reader.result);
        setPreviewImages((prevPreviewImages) => [
          ...prevPreviewImages,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    }
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
      <StyledModalContent>
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
      </StyledModalContent>
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
    callback: () => alert("modal"),
  };

  const modalOption = {
    canCloseOnOverlayClick: true,
    isCloseButton: true,
    padding: "10px",
    width: "630px",
    height: "700px",
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

  //갤러리 상세조회
  const getDetailGallery = (imageId) => {
    MemberAPI.getDetailGallery(id, imageId).then((response) => {
      const gallertModalData = {
        title: (
          <>
            <StyledGalleryModalHeader>갤러리</StyledGalleryModalHeader>
            <StyledGalleryModalTitleBox>
              <StyledModalTitle>{response?.data.data.title}</StyledModalTitle>
              <StyledModalDate>{response?.data.data.createdAt}</StyledModalDate>
            </StyledGalleryModalTitleBox>
          </>
        ),
        contents: (
          <StyledModalContent>
            {response?.data.data.imageUrlList.map((item) => {
              return (
                <StyledAddGallery>
                  <StyledPreviewImage src={item} />
                </StyledAddGallery>
              );
            })}
          </StyledModalContent>
        ),
        callback: () => alert("modal"),
      };
      openModal(gallertModalData);
    });
  };

  return (
    <>
      <StyledGalleryWrapper>
        <StyledGalleryHeader>
          <Buttons.Filter outlined>전체기간</Buttons.Filter>
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
              minDate={startDate}
            />
          </StyledDatePickerWrapper>
          <Buttons.Filter colorTypes="primary" onClick={handleDateSearch}>
            적용하기
          </Buttons.Filter>
          <SyledAddGalleryButton onClick={createGallery}>
            사진 등록
          </SyledAddGalleryButton>
          <StyledGallerySearchInput onChange={handleSearch} />
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
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalItems}
            onChange={(page) => setCurrentPage(page)}
          />
        </StyledPaginationContainer>
      </StyledGalleryWrapper>
      <Modal modalOption={modalOption} />
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
  width: 170px;
  height: 150px;
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

const StyledModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 520px;
  overflow-y: auto;
`;

const StyledAddGallery = styled.div`
  width: 240px;
  height: 250px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 1px;
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
  width: 240px;
  height: 250px;
  border-radius: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
  margin-left: 7px;
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
  margin-left: 10px;
`;

const StyledGalleryModalHeader = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledGalleryModalTitleBox = styled.div`
  padding: 20px;
  gap: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const StyledModalTitle = styled.div`
  ${textVariants.H3_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
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
