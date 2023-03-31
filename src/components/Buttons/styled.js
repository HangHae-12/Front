import styled, { css } from "styled-components";
import { lighten } from "polished";
import buttonVariants from "../../styles/variants/buttonVariants";

export const StyledButton = styled.button`
  display: inline-flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;

  background-color: ${({ colorTypes, bgColor, theme }) =>
    colorTypes
      ? theme.color[colorTypes]
      : bgColor ?? theme.color.grayScale[50]};

  border: ${({ outlined }) => (outlined ? "1px solid" : "none")};
  border-color: ${({ outlined, bgColor, theme }) =>
    outlined ? bgColor : theme.color.grayScale[400]};

  color: ${({ outlined, theme, colorTypes, color }) =>
    color
      ? color
      : outlined
      ? theme.color.grayScale[400]
      : colorTypes
      ? theme.color.white
      : theme.color.grayScale[200]};

  &:hover {
    background-color: ${({ colorTypes, bgColor, theme }) =>
      colorTypes
        ? lighten(0.1, theme.color[colorTypes])
        : bgColor
        ? lighten(0.1, bgColor)
        : lighten(0.2, theme.color.grayScale[50])};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.color.grayScale[50]};
      color: ${({ theme }) => theme.color.grayScale[200]};
      opacity: 70%;
      pointer-events: none;
    `}

  ${({ buttonsTypes }) =>
    buttonsTypes === "State" &&
    css`
      color: ${({ theme, colorTypes }) => theme.color[colorTypes]};
      background-color: ${({ theme, colorTypes }) =>
        lighten(0.3, theme.color[colorTypes])};

      &:hover {
        color: ${({ theme, colorTypes }) => theme.color[colorTypes]};
        background-color: ${({ theme, colorTypes }) =>
          lighten(0.3, theme.color[colorTypes])};
      }
    `}

  ${({ buttonsTypes }) => buttonVariants[buttonsTypes] ?? ""}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  opacity: ${({ opacity }) => opacity};
  transition: background-color 0.3s ease-in-out;
  white-space: nowrap;
  cursor: pointer;
`;