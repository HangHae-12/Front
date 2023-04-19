import React, { useEffect } from "react";
import styled from "styled-components";
import Test from "./Test";
import Header from "./Header";
import tokenCookie from "../../utils/tokenCookie";
import session from "../../utils/session";

const Main = () => {
  useEffect(() => {
    tokenCookie.remove();
    session.clear();
  }, []);

  return (
    <StyledLayout>
      <StyledHeader>
        <Header />
      </StyledHeader>
      <StyledLayoutMain>
        <Test />
      </StyledLayoutMain>
    </StyledLayout>
  );
};

export default Main;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
//스크롤 내려도 킨더그루로고랑 카카오로그인은 그대로 고정시키기
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 165px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: transparent;
`;

const StyledLayoutMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 100px);
`;
