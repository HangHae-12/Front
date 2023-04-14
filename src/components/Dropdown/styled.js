import styled from "styled-components";
import { darken } from "polished";
import { RxTriangleDown } from "react-icons/rx";
import textVariants from "../../styles/variants/textVariants";

const StyledDropdown = {
  Container: styled.div`
    position: relative;
    display: inline-block;
    width: min-content;
    ${({ containerStyle }) => containerStyle}
  `,

  Button: styled.button`
    ${textVariants.H3_SemiBold}
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.color.grayScale[25]};
    color: ${({ theme }) => theme.color.grayScale[500]};
    border: ${({ theme }) => `1px solid ${theme.color.grayScale[200]}`};
    border-radius: 40px;
    padding: 12px 21px;
    white-space: nowrap;
    cursor: ${({ isReadOnly }) => (isReadOnly ? "auto" : "pointer")};
    ${({ buttonStyle }) => buttonStyle}
  `,

  Menu: styled.div`
    ${textVariants.Body1_SemiBold}
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
    background: ${({ theme }) => theme.color.white};
    border-radius: 12px;
    padding: 8px 0;
    min-width: 160px;
    z-index: 10;
    ${({ menuStyle }) => menuStyle}
  `,

  Item: styled.a`
    display: block;
    padding: 8px 16px;
    background: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.grayScale[500]};

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => darken(0.1, theme.color.white)};
    }

    ${({ itemStyle }) => itemStyle}
  `,

  Icon: styled(RxTriangleDown)`
    width: 25px;
    height: 25px;
    color: ${({ theme }) => theme.color.grayScale[200]};
  `,
};

export default StyledDropdown;
