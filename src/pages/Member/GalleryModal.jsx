import React from "react";
import styled from "styled-components";

export const GalleryDetail = ({ response }) => {

  return (
    <>
      <StyledModalContent>
        {response?.data.data.imageUrlList.map((item) => {
          return (
            <StyledAddGallery key={item}>
              <StyledPreviewImage src={item} />
            </StyledAddGallery>
          );
        })}
      </StyledModalContent>
    </>
  );
};

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

const StyledPreviewImage = styled.img`
  width: 360px;
  height: 320px;
  border-radius: 8px;
  margin-top: 30px;
`;
