import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import StyledLogin from "../styled";
import { useLocation, Outlet } from "react-router-dom";
import textVariants from "../../../styles/variants/textVariants";
import Buttons from "../../../components/Buttons";
import { useForm } from "react-hook-form";
import { createContext, useContext } from "react";
import getConsoleFormData from "../../../utils/getConsoleFormData";

const RegistrationFormContext = createContext();
export const useRegistrationForm = () => {
  return useContext(RegistrationFormContext);
};

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const isInfoPage = location.pathname === "/signup/registration/info";
  const isClassPage = location.pathname === "/signup/registration/class";

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);

    getConsoleFormData(formData);
  };

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
      <RegistrationFormContext.Provider
        value={{ register, errors, isSubmitSuccessful }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Outlet />

          {isInfoPage && (
            <Buttons.Filter
              colorTypes="primary"
              type="button"
              onClick={() => navigate("./class")}
            >
              다음
            </Buttons.Filter>
          )}
          {isClassPage && (
            <>
              <Buttons.Filter
                outlined
                type="button"
                onClick={() => navigate("./info")}
              >
                이전
              </Buttons.Filter>
              <Buttons.Filter colorTypes="primary" type="submit">
                등록
              </Buttons.Filter>
            </>
          )}
        </form>
      </RegistrationFormContext.Provider>
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
