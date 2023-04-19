import React from 'react';
import styled from 'styled-components';
import { styles } from './MainPageStyled';
import ThirdImg from '../../assets/MainImage/ThirdImg.png';
import textVariants from "../../styles/variants/textVariants";

const ThirdPage = () => {
  return (
    <>
      <styles.MainContainer>
        <StyledMainWrapper>
          <styles.MainTopContainer center>
            <StyledDescriptiontitle>
              <span>아이의 출결현황을 한눈에 쉽게,</span>
              <span>결석신청도 할 수 있어요</span>
            </StyledDescriptiontitle>
          </styles.MainTopContainer>
          <styles.MainBottomContainer
            bg={ThirdImg}
            small
          ></styles.MainBottomContainer>
        </StyledMainWrapper>
      </styles.MainContainer>
    </>
  );
}
export default ThirdPage;


const StyledMainWrapper = styled(styles.MainWrapper)`
  justify-content: center;
  align-items: center;
`;

const StyledDescriptiontitle = styled.div`
  ${textVariants.H1}
  display:flex;
  flex-direction:column;
  margin-left:120px;
  gap: 16px;
  span:first-child {
    ${textVariants.H1}
    font-size: 40px;
  }
`;
