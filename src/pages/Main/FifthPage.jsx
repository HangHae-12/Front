import React from 'react';
import styled from 'styled-components';
import FirstImg from '../../assets/MainImage/FirstImg.png';
import { styles } from './MainPageStyled';

const FirstPage = () => {
  return (
    <>
      <StyledMainContainer>
        <styles.MainWrapper reverse>
          <StyledMainTopContainer>
            DDD
          </StyledMainTopContainer>
          <StyledMainBottomContainer bg={FirstImg}></StyledMainBottomContainer>
        </styles.MainWrapper>
      </StyledMainContainer>
    </>
  );
}
export default FirstPage;

const StyledMainContainer = styled.div`
  width: 100vw;
`;

const StyledMainTopContainer = styled.div`
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  align-items: flex-start;
  height: 100%;
  padding: 16px 32px;
  @media ${({ theme }) => theme.device.laptop} {
    height: fit-content;
  }
  
`;

const StyledMainBottomContainer = styled.div`
  position: relative;
  width: ${props => (props.small ? '50%' : '80%')};
  height: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    height: 50%;
  }
`;