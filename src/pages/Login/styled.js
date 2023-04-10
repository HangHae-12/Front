import styled from "styled-components";
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
};

export default StyledLogin;
