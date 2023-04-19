import React from 'react';
import styled from 'styled-components';
import { styles } from './MainPageStyled';
import FirstImg from '../../assets/MainImage/FirstImg.png';
import Typing from './Typing';
import textVariants from "../../styles/variants/textVariants";

const FirstPage = ({ setPageIndex }) => {
  const textList = ['킨더그루'];

  return (
    <>
      <StyledMainContainer>
        <StyledMainWrapper>
          <StyledMainLeftContainer>
            <StyledDescription>아이의 교육에 보다 집중하게 해주는</StyledDescription>
            <StyledCompanyTitle>
              <Typing textList={textList} />
            </StyledCompanyTitle>
          </StyledMainLeftContainer>
          <StyledMainRightContainer bg={FirstImg} />
        </StyledMainWrapper>
      </StyledMainContainer>
    </>
  );
}
export default FirstPage;

const StyledMainContainer = styled(styles.MainContainer)`
  height: calc(100vh - 292px);
`;
const StyledMainWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  width: 100%;
  padding: 16px 32px;
`;

const StyledMainLeftContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 84px;
  z-index: 1;
`;

const StyledMainRightContainer = styled.div`
  margin-top: 80px;
  display:flex;
  align-items:center;
  background: url(${props => props.bg}) no-repeat center center/contain;
  width: 714px;
  height: 710px;
  @media ${({ theme }) => theme.device.laptop} {
    position: absolute;
    opacity: 0.4;
    filter: blur(10px);
    margin-top: 0;
  }
  @media ${({ theme }) => theme.device.mobile} {
    position: absolute;
    opacity: 0.4;
    filter: blur(10px);
    margin-top: 0;
  }
`;
const StyledDescription = styled.span`
   ${textVariants.H1}
  margin-bottom: 16px;
  margin-left: 80px;
`;

const StyledCompanyTitle = styled.span`
  min-height: 73px;
  margin-bottom: 57px;
  margin-left: 70px;
`;
