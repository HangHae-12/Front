import React, { useEffect } from 'react';
import styled from 'styled-components';
import Test from './Test';
import Login from './Header';
import ASSETS from "../../helpers/assets";
import tokenCookie from "../../utils/tokenCookie";
import session from "../../utils/session";

const Preview = () => {

  useEffect(() => {
    tokenCookie.remove();
    session.clear();
  }, []);

  return (
    <StyledLayout>
      <StyledHeader>
        <StyledLogo bg={ASSETS.test2}>
        </StyledLogo>
        <StyledHeaderBtn>
          <Login />
        </StyledHeaderBtn>
      </StyledHeader>
      <StyledLayoutMain>
        <Test />
      </StyledLayoutMain>
    </StyledLayout>
  );
};

export default Preview;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
//스크롤 내려도 킨더그루로고랑 카카오로그인은 그대로 고정시키기
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 165px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: transparent;
`;
const StyledLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top:20px;
  width: 250px;
  height: 130px;
  background: url(${props => props.bg}) no-repeat center center/contain;
  flex: 0 0 auto;
`;

const StyledHeaderBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    width: 100%;
    padding-right: 20px;
  
`;

const StyledLayoutMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 100px);
`;

