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

  Thumbnail: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  `,

  Input: styled.input``,

  Button: styled.button``,

  ErrorMessage: styled.span`
    color: ${({ theme }) => theme.color.red};
  `,
};

export default StyledExtraInfo;
