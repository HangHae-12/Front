import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100vw;
`;

const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: space-around;
  align-items: center;
  width: calc(100vw - 80px);
  height: calc(100vh - 164px);
  margin-top: 164px;
  padding: 16px 32px;
  @media ${({ theme }) => theme.device.laptop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
  }
`;

const MainTopContainer = styled.div`
  ${props => props.theme.FlexCol};
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  align-items: flex-start;
  height: 100%;
  padding: 0 32px; 
  @media ${({ theme }) => theme.device.laptop} {
    height: fit-content;
  }
`;

const MainBottomContainer = styled.div`
  position: relative;
  width: ${props => (props.small ? '50%' : '80%')};
  height: 100%;
  background: url(${props => props.bg}) no-repeat center center/contain;
  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    height: 50%;
  }
`;


export const styles = {
  MainContainer,
  MainWrapper,
  MainTopContainer,
  MainBottomContainer,
};
