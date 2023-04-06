import styled from "styled-components";
import textVariants from "../styles/variants/textVariants";

const Button = {
  ClassButton: ({ selected, onClick, selectedButton }) => {
    return (
      <StyledClassButton
        selected={selected === selectedButton}
        onClick={onClick}
      >
        {selected}
      </StyledClassButton>
    );
  },

  NormalButton: () => {},
};

export default Button;
const StyledClassButton = styled.button`
  ${textVariants.Body1_Bold}
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme, selected }) =>
    selected ? theme.color.primary : theme.color.grayScale[300]};
  border: none;
  padding: 10px;
  margin-left: auto;
  width: fit-content;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
    &::after {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }

  &:last-child {
    margin-right: 0;
  }
  //밑줄 표현 위해 가상선택자 사용
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -2px;
    width: calc(100% - 15px);
    height: 2px;
    background-color: ${({ theme, selected }) =>
      selected ? theme.color.primary : theme.color.grayScale[300]};
  }
`;
