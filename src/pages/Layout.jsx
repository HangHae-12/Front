import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <SideBar />
      </StyledLeftContainer>
      {/* 사이드 바 컴포넌트를 학부모용, 선생용으로 나눠서 조건부 렌더링 해도 괜찮을 듯. */}
      {/* 레이아웃 컴포넌트에 useCallback 으로 받아온 유저정보를 캐싱해서 수정될때만 렌더링 되게 하면 괜찮지 않을까 ? */}
      <StyledRightContainer>
        <Outlet />
      </StyledRightContainer>
    </StyledContainer>
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
`;

const StyledRightContainer = styled.div`
  flex-grow: 1;
  width: calc(100% - 240px);
  height: 100%;
  min-height: 100vh;
  margin: 60px 150px 94px 150px;

`;