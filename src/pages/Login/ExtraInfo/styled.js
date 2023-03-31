import styled from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const StyledExtraInfo = {
  Container: styled.div`
    display: flex;
    width: 300px;
    flex-direction: column;
  `,

  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  Label: styled.label`
    ${textVariants.Body2_Bold}
  `,

  Input: styled.input``,

  Button: styled.button``,

  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red};
  `,
};

export default StyledExtraInfo;
