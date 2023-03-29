import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { MemberAPI } from "../../api/memberAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Modal from "../../components/Modal";
import useModal from "../../hooks/useModal";
import { IoIosAdd } from "react-icons/io";

function Gallery() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchGallery, setSearchGallery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const [detailImages, setDetailImages] = useState([]); // 프리뷰 보여줄 이미지 데이터
  const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
  const [render, setRender] = useState(true);

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

  const itemsPerPage = 15;

  const totalItems = 100;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchGallery(e.target.value);
    queryClient.invalidateQueries(["classesGallery", searchGallery]);
    console.log(data);
  };

  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  const handleDateSearch = () => {
    setFormattedStartDate(dateToString(startDate));
    setFormattedEndDate(dateToString(endDate));
    return MemberAPI.getSearchDateGallery(
      id,
      formattedStartDate,
      formattedEndDate
    );
  };

  const uploadFile = (event) => {
    const fileArr = event.target.files;
    setPostImages((prevPostImages) => [
      ...prevPostImages,
      ...Array.from(fileArr),
    ]);

    const filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      const file = fileArr[i];
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setDetailImages((prevDetailImages) => [
          ...prevDetailImages,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const modalData = {
    title: "modal",
    contents: (
      <StyledModalContent>
        <StyledAddGallery>
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
          <StyledAddFont htmlFor="upload-img" id="upload-img-label">
            사진추가
          </StyledAddFont>
        </StyledAddGallery>
        {detailImages.map((item) => {
          return (
            <StyledAddGallery key={item}>
              <StyledPreviewImage src={item} />
            </StyledAddGallery>
          );
        })}
      </StyledModalContent>
    ),
    callback: () => alert("modal"),
  };

  const modalOption = {
    canCloseOnOverlayClick: true,
    isCloseButton: true,
    padding: "10px",
    width: "630px",
    height: "660px",
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
  }, [detailImages]);

  return (
    <>
      <StyledGalleryWrapper>
        <StyledGalleryHeader>
          <button>전체기간</button>
          <div>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <button onClick={handleDateSearch}>조회</button>
          <button onClick={createGallery} style={{ marginLeft: "auto" }}>
            사진등록
          </button>
          <input
            style={{ marginLeft: "10px" }}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
        </StyledGalleryHeader>
        <StyledGalleryContainer>
          {data?.data.data.map((item) => {
            return (
              <StyledGalleryCard key={item.imagePostId}>
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
}

export default Gallery;

const StyledGalleryWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(5 * (220px + 18px));
  height: 900px;
  background: #ffffff;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 100%;
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
  width: 210px;
  height: 250px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-left: 20px;
  margin-top: 10px;
`;

const StyledGalleryImage = styled.img`
  width: 170px;
  height: 150px;
  border-radius: 4px;
`;

const StyledTitleFont = styled.div`
  width: auto;
  height: 16px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
`;

const StyledDateFont = styled.div`
  width: auto;
  height: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
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
  /* border: 1px solid black; */
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
`;

const StyledAddInput = styled.input`
  display: none;
`;

const StyledPreviewImage = styled.img`
  width: 240px;
  height: 250px;
  border-radius: 8px;
`;
