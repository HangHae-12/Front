import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  useQueryClient,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getClassesGallery, getSearchGallery } from "../../api/classes/classes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";

function Gallery() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [searchGallery, setSearchGallery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());



  // react-js-pagination
  // const { data } = useQuery(
  //   ["classesGallery", searchGallery, currentPage],
  //   () => {
  //     if (searchGallery) {
  //       return getSearchGallery(searchGallery, currentPage, 15);
  //     }
  //     return getClassesGallery(id, currentPage, 15);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   }
  // );

  //인피니티쿼리
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery(
  //     ["classesGallery", searchGallery],
  //     async ({ pageParam = 1 }) => {
  //       if (searchGallery) {
  //         return getSearchGallery(searchGallery, pageParam, 15);
  //       }
  //       return getClassesGallery(id, pageParam, 15);
  //     },
  //     {
  //       getNextPageParam: (lastPage) => {
  //         if (lastPage.currentPage < lastPage.totalPages) {
  //           return lastPage.currentPage + 1;
  //         }
  //         return false;
  //       },
  //     }
  //   );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchGallery(e.target.value);
    queryClient.invalidateQueries(["classesGallery", searchGallery]);
  };

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const cards = [];
  for (let i = 0; i < 15; i++) {
    cards.push(
      <StyledGalleryCard key={i}>
        <StyledGalleryImage src="https://blog.kakaocdn.net/dn/drkKUz/btrKzPmA6Xi/cLjppsVnQYYF2dggTuvCf0/img.png" />
        <StyledTitleFont>제목</StyledTitleFont>
        <StyledFont>
          <StyledDateFont>2023.03.21 14:30</StyledDateFont>
          <StyledDateFont>황재연</StyledDateFont>
        </StyledFont>{" "}
      </StyledGalleryCard>
    );
  }
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
          <button style={{ marginLeft: "auto" }}>사진등록</button>
          <input
            style={{ marginLeft: "10px" }}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
        </StyledGalleryHeader>
        <StyledGalleryContainer>
          {cards}
          {/* {data?.map((item) => {
            return (
              <StyledGalleryCard key={item.data.imagePostId}>
            <StyledGalleryImage src={item.data.imageUrlList} />
            <StyledTitleFont>{item.data.title}</StyledTitleFont>
            <StyledFont>
              <StyledDateFont>{item.data.createdAt}</StyledDateFont>
              <StyledDateFont>{item.data.name}</StyledDateFont>
            </StyledFont>
          </StyledGalleryCard>
            );
          })} */}
        </StyledGalleryContainer>
        {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </button> */}
        {/* <PaginationContainer>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={15}
            // totalItemsCount={data?.totalItemsCount}
            totalItemsCount={16}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            innerClass="pagination"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="active"
          />
        </PaginationContainer> */}
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

  .pagination {
    display: flex;
    list-style-type: none;
    padding-inline-start: 0;
  }

  .page-item {
    margin: 0 4px;
  }

  .page-link {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 4px;
    color: #000000;
    text-decoration: none;
    background-color: #f5f5f5;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .page-link:hover {
    background-color: #e0e0e0;
  }

  .active .page-link {
    background-color: #2f80ed;
    color: #ffffff;
  }
`;
