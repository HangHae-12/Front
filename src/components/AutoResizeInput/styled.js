import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const StyledInputLabel = styled.label`
  ${textVariants.Body1_SemiBold}
  position: relative;
  display: inline-grid;
  align-items: center;
  padding: 4px 8px;
  border: none;
  color: ${({ theme }) => theme.color.grayScale[500]};
  background-color: ${({ theme }) => theme.color.grayScale[50]};
  outline: none;

  ${({ styleOption }) => styleOption}

  &::after,
  input {
    width: auto;
    grid-area: 1 / 2;
    font: inherit;
    color: inherit;
    background: none;
    appearance: none;
    border: none;
    outline: none;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
`;

export default StyledInputLabel;
