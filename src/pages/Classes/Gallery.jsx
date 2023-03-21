import React from "react";
import styled from "styled-components";

function Gallery() {
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
          <button style={{ marginLeft: "auto" }}>사진등록</button>
          <input style={{ marginLeft: "10px" }}></input>
        </StyledGalleryHeader>
        <StyledGalleryContainer>
          {cards}
          {/* <StyledGalleryCard>
            <StyledGalleryImage src="https://blog.kakaocdn.net/dn/drkKUz/btrKzPmA6Xi/cLjppsVnQYYF2dggTuvCf0/img.png" />
            <StyledTitleFont>제목</StyledTitleFont>
            <StyledFont>
              <StyledDateFont>2023.03.21 14:30</StyledDateFont>
              <StyledDateFont>황재연</StyledDateFont>
            </StyledFont>
          </StyledGalleryCard> */}
        </StyledGalleryContainer>
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
