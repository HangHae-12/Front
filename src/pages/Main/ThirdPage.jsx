import React from 'react';
import styled from 'styled-components';
import { styles } from './MainPageStyled';
import RendingImg from '../../assets/MainImage/Three.png';
import textVariants from "../../styles/variants/textVariants";

const ThirdPage = () => {
  return (
    <>
      <styles.MainContainer>
        <StyledRendingWrapper>
          <styles.MainTopContainer center>
            <StyledDescriptiontitle>
              <span>학급 열람 기능,원생 등록기능</span>
              <span>앨범</span>
            </StyledDescriptiontitle>
          </styles.MainTopContainer>
          <styles.MainBottomContainer
            bg={RendingImg}
            small
          ></styles.MainBottomContainer>
        </StyledRendingWrapper>
      </styles.MainContainer>
    </>
  );
}
export default ThirdPage;


const StyledRendingWrapper = styled(styles.MainWrapper)`
  justify-content: center;
  align-items: center;
`;

const StyledDescriptiontitle = styled.div`
  ${textVariants.H1}
  gap: 10px;
  span:first-child {
    ${textVariants.H1}
  }
`;
