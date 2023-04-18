import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import StyledLogin from "../styled";
import { useLocation, Outlet } from "react-router-dom";
import textVariants from "../../../styles/variants/textVariants";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInfoPage = location.pathname === "/signup/registration/info";
  const isClassPage = location.pathname === "/signup/registration/class";

  return (
    <StyledRegistration.Container>
      <StyledLogin.Title>유치원 등록</StyledLogin.Title>
      <StyledRegistration.Nav>
        <StyledRegistration.NavButton
          isPage={isInfoPage}
          onClick={() => {
            navigate("./info");
          }}
        >
          기본정보
        </StyledRegistration.NavButton>
        <StyledRegistration.NavButton
          isPage={isClassPage}
          onClick={() => {
            navigate("./class");
          }}
        >
          반 등록
        </StyledRegistration.NavButton>
      </StyledRegistration.Nav>
      <Outlet />
    </StyledRegistration.Container>
  );
};

export default Registration;

const StyledRegistration = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    padding: 45px 70px;
  `,

  Nav: styled.nav`
    display: flex;
    align-items: center;
    margin: 10px 0px 30px 0px;
    gap: 10px;
  `,

  NavButton: styled.span`
    ${textVariants.Body1_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[200]};
    cursor: pointer;

    ${({ isPage }) =>
      isPage &&
      css`
        color: ${({ theme }) => theme.color.grayScale[700]};
      `}
  `,
};
