import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import StyledLogin from "../styled";
import { useLocation, Outlet } from "react-router-dom";
import textVariants from "../../../styles/variants/textVariants";
import Buttons from "../../../components/Buttons";
import { useForm } from "react-hook-form";
import { createContext, useContext } from "react";
import getConsoleFormData from "../../../utils/getConsoleFormData";
import { useProfileImageUploader } from "../../../hooks/useProfileImageUploader";
import { useMutation } from "@tanstack/react-query";
import SignAPI from "../../../api/SignAPI";

const RegistrationFormContext = createContext();
export const useRegistrationForm = () => {
  return useContext(RegistrationFormContext);
};

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInfoPage = location.pathname === "/signup/registration/info";
  const isClassPage = location.pathname === "/signup/registration/class";

  const { selectedFile, isCancelled } = useProfileImageUploader(
    "logoImage",
    "default_logo"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    trigger,
    setValue,
  } = useForm();

  const { mutate } = useMutation(SignAPI.registrationKinder, {
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("kindergartenName", data.kindergartenName);
    formData.append("contactNumber", data.contactNumber);
    formData.append("address", `${data.address} ${data.restAddress}`);
    formData.append("isCancelled", isCancelled);
    formData.append("classroomList", data.classroomList);
    selectedFile && formData.append("logoImage", selectedFile);

    // getConsoleFormData(formData);
    mutate(formData);
  };

  const handleNextButtonValidationCheck = async () => {
    const isValid = await trigger();
    isValid && navigate("./class");
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
          onClick={handleNextButtonValidationCheck}
        >
          반 등록
        </StyledRegistration.NavButton>
      </StyledRegistration.Nav>
      <RegistrationFormContext.Provider
        value={{ register, errors, isSubmitSuccessful, setValue }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledRegistration.Wrapper>
            <Outlet />
          </StyledRegistration.Wrapper>

          {isInfoPage && (
            <StyledRegistration.SubmitBtnWrapper>
              <Buttons.Filter
                colorTypes="primary"
                type="button"
                onClick={handleNextButtonValidationCheck}
              >
                다음
              </Buttons.Filter>
            </StyledRegistration.SubmitBtnWrapper>
          )}
          {isClassPage && (
            <>
              <StyledRegistration.SubmitBtnWrapper>
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
              </StyledRegistration.SubmitBtnWrapper>
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
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 45px 70px;
    form {
      display: flex;
      height: 100%;
      flex-direction: column;
    }
  `,

  Wrapper: styled.div`
    flex-grow: 1;
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

  SubmitBtnWrapper: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  `,
};
