import styled, { css } from "styled-components";
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
    color: ${({ theme }) => theme.color.grayScale[600]};

    strong {
      ${textVariants.H2_SemiBold}
      color:${({ theme }) => theme.color.primary};
    }
  `,

  Label: styled.label`
    ${textVariants.Body2_SemiBold}
    position: relative;
    color: ${({ theme }) => theme.color.grayScale[500]};
    ${({ isEssential }) =>
      isEssential &&
      css`
        &::after {
          content: "*";
          position: absolute;
          top: 0;
          left: -10px;
          transform: translateX(-50%);
          color: ${({ theme }) => theme.color.primary};
        }
      `}
  `,

  Input: styled.input`
    ${textVariants.Body1_SemiBold}
    position: relative;
    height: 32px;
    padding: 4px 8px;
    background: ${({ theme }) => theme.color.grayScale[50]};
    border: none;
    border-radius: 2px;
    outline: none;
    transition: 0.3s all;
    border: 1.5px solid transparent;

    &::placeholder {
      opacity: 0.2;
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme.color.grayScale[300]};
    }

    ${({ valid }) =>
      valid &&
      css`
        border-color: ${({ theme }) => theme.color.red};
        &:focus {
          border-bottom-color: ${({ theme }) => theme.color.red};
        }
      `}
  `,
};

export default StyledLogin;
