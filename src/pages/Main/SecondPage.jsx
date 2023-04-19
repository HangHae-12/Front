import React from 'react';
import styled from 'styled-components';
import SecondImg from '../../assets/MainImage/SecondImg.png';
import textVariants from "../../styles/variants/textVariants";

const SecondPage = () => {
  return (
    <>
      <StyledMainContainer>
        <StyledMainWrapper>
          <StyledMainTopContainer>
            <StyledDescriptiontitle>
              내아이의 안전한 등/하원 ,  <span>실시간으로 알림</span> 을 받을수 있어요
            </StyledDescriptiontitle>
          </StyledMainTopContainer>
          <StyledMainBottomContainer bg={SecondImg}></StyledMainBottomContainer>
        </StyledMainWrapper>
      </StyledMainContainer>
    </>
  );
}
export default SecondPage;

const StyledMainContainer = styled.div`
  width: 100vw;
`;

const StyledMainWrapper = styled.div`
  flex-direction: column;
`;
const StyledMainTopContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items: flex-end;
  padding: 10px;
`;

const StyledDescriptiontitle = styled.span`

  ${textVariants.H1}
  span {
    font-size: 40px;
  }
`;

const StyledMainBottomContainer = styled.div`
  position: relative;
  height: calc(100vh - 232px);
  width: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
`;
