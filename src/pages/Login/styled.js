import styled from "styled-components";
import TextVariants from "../../styles/variants/textVariants";
import textVariants from "../../styles/variants/textVariants";

const StyledLogin = {
  Background: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.green_darker};
  `,

  Container: styled.section`
    display: flex;
    width: 862px;
    height: 518px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.white};
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
  `,

  Title: styled.h3`
    ${textVariants.H3_Bold}
  `,

  LoginPageWrapper: styled.div`
    width: min-content;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      ${TextVariants.Body3_SemiBold}
      font-size: 20px;
      white-space: nowrap;
      color: ${({ theme }) => theme.color.primary};
      margin: 20px 0px 64px 0px;
    }
  `,
};

export default StyledLogin;
