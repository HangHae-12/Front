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

// export const GalleryDetailIcon = (greenIcon) => {
//   return (
//     <>
//       <StyledGalleryModalHeader>갤러리</StyledGalleryModalHeader>
//       <StyledModalTitle>{response?.data.data.title}</StyledModalTitle>
//       <StyledGalleryDualModalWrapper>
//         <StyledModalDate>{response?.data.data.createdAt}</StyledModalDate>
//         <StyledButtonWrapper>
//           <StyledSlideIcon
//             color={greenIcon === "slide" ? "#3cc678" : undefined}
//             onClick={() => handleClickSlide(response)}
//           />
//           <StyledSplitIcon
//             color={greenIcon === "split" ? "#3cc678" : undefined}
//             onClick={() => handleClickSplit(response)}
//           />
//         </StyledButtonWrapper>
//       </StyledGalleryDualModalWrapper>
//     </>
//   );
// };

const StyledModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
  max-height: 640px;
   @media screen and (max-width: 1500px) {
    max-height: 320px;
  }
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

// const StyledGalleryModalHeader = styled.div`
//   ${textVariants.Body1_SemiBold}
//   color: ${({ theme }) => theme.color.grayScale[600]};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 15px;
// `;

// const StyledModalTitle = styled.div`
//   ${textVariants.H3_SemiBold}
//   display: flex;
//   align-items: center;
//   margin: 20px;
//   padding: 0px 12px;
//   width: 780px;
//   height: 30px;
//   color: ${({ theme }) => theme.color.grayScale[600]};
//   background-color: ${({ theme }) => theme.color.grayScale[50]};
// `;

// const StyledGalleryDualModalWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 30px;
//   gap: 12px;
//   border-bottom: 2px solid ${({ theme }) => theme.color.grayScale[200]};
// `;

// const StyledModalDate = styled.div`
//   ${textVariants.Body3_SemiBold}
//   color: ${({ theme }) => theme.color.grayScale[500]};
//   margin-top: 15px;
// `;

// const StyledButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   float: right;
// `;

// const StyledSlideIcon = styled.div`
//   width: 21px;
//   height: 21px;
//   background: ${({ color }) => color || "#d9d9d9"};
// `;

// const StyledSplitIcon = styled(AiFillAppstore)`
//   width: 28px;
//   height: 28px;
//   color: ${({ color }) => color || "#3cc678"};
// `;
