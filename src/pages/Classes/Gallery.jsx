import React from 'react'
import styled from 'styled-components'

function Gallery() {
  return (
    <>
    <button>아이들</button>
    <button>갤러리</button>
      
    <StyledGalleryWrapper>
    </StyledGalleryWrapper>
    </>
  )
}

export default Gallery

const StyledGalleryWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(8 * (130px + 16px));
  height: 650px;
  background: #FFFFFF;
  border-radius: 8px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
