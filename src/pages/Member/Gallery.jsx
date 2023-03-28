import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { MemberAPI } from "../../api/memberAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

function Gallery() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchGallery, setSearchGallery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleTest = () => {
    console.log(data.pages);
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
          <button onClick={handleTest} style={{ marginLeft: "auto" }}>
            사진등록
          </button>
          <input
            style={{ marginLeft: "10px" }}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
        </StyledGalleryHeader>
        <StyledGalleryContainer>
          {data?.pages[0].data.data.map((item) => {
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
        <PaginationContainer>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalItems}
            onChange={(page) => setCurrentPage(page)}
          />
        </PaginationContainer>
      </StyledGalleryWrapper>
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
  font-family: "Pretendard";
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
  font-family: "Pretendard";
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
