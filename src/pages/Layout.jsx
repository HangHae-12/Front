import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <>
      <SideBar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
};

export default Layout;

const StyledMain = styled.main`
  width: calc(100% - 200px);
  height: 100%;
  min-height: 100vh;
  margin-left: 200px;
`;
