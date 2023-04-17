import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import ReloadRoute from "../shared/ReloadRoute";

const Layout = () => {

  return (
    <>
      <ReloadRoute />
      <StyledContainer>
        <StyledLeftContainer>
          <SideBar />
        </StyledLeftContainer>
        <StyledRightContainer>
          <Outlet />
        </StyledRightContainer>
      </StyledContainer>
    </>
  );
};

export default Layout;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLeftContainer = styled.div`
  width: 200px;
  height: 100vh;
  margin:0px;
  
  @media ${({ theme }) => theme.device.laptop} {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const StyledRightContainer = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  min-height: 100vh;
  margin: 60px 150px 94px 150px;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    
  }

`;