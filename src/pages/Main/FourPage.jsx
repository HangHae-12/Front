import React from 'react';
import styled from 'styled-components';
import FourImg from '../../assets/MainImage/FourImg.png';
import { styles } from './MainPageStyled';
import textVariants from "../../styles/variants/textVariants";

const FourPage = () => {
  return (
    <>
      <StyledMainContainer>
        <styles.MainWrapper reverse>
          <StyledMainTopContainer>
            <StyledDescriptiontitle>
              <span>학부모는 내아이의 학급생활열람하고,</span>
              <span>선생님은 원생 등록을 손쉽게 할 수 있어요 </span>
            </StyledDescriptiontitle>
          </StyledMainTopContainer>
          <StyledMainBottomContainer bg={FourImg}></StyledMainBottomContainer>
        </styles.MainWrapper>
      </StyledMainContainer>
    </>
  );
}
export default FourPage;

const StyledMainContainer = styled.div`
  width: 100vw;
`;

const StyledMainTopContainer = styled.div`
  display:flex;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  align-items: flex-start;
  height: 100%;
  padding: 16px 32px;
  @media ${({ theme }) => theme.device.laptop} {
    height: fit-content;
  }
  
`;
const StyledDescriptiontitle = styled.div`
  ${textVariants.H3_Bold}
  display:flex;
  flex-direction:column;
  margin-right:140px;
  gap: 16px;
  span:first-child {
    ${textVariants.H1}
    font-size: 34px;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 20px;
  }
  @media ${({ theme }) => theme.device.desktop} {
    ${textVariants.H2_Bold}
    span:first-child {
    ${textVariants.H1}
    font-size: 38px;
  }
  }
`;


const StyledMainBottomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    height: 50%;
  }
`;
