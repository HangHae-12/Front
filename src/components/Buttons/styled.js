import styled, { css } from "styled-components";
import { lighten } from "polished";
import buttonVariants from "../../styles/variants/buttonVariants";

export const StyledButton = styled.button`
  display: inline-flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;

  background-color: ${({ colorTypes, bgColor, theme, outlined }) => {
    if (outlined) {
      return bgColor ? bgColor : theme.color.white;
    }
    return colorTypes
      ? theme.color[colorTypes]
      : bgColor ?? theme.color.grayScale[50];
  }};

  border: ${({ outlined }) => (outlined ? "1px solid" : "none")};
  border-color: ${({ outlined, bgColor, theme, colorTypes }) =>
    outlined
      ? colorTypes
        ? theme.color[colorTypes]
        : bgColor
        ? bgColor
        : theme.color.grayScale[400]
      : null};

  color: ${({ outlined, theme, colorTypes, color }) =>
    color
      ? color
      : outlined
      ? colorTypes
        ? theme.color[colorTypes]
        : theme.color.grayScale[400]
      : colorTypes
      ? theme.color.white
      : theme.color.grayScale[200]};

  &:hover {
    background-color: ${({ colorTypes, bgColor, theme, outlined }) =>
      outlined
        ? bgColor
          ? lighten(0.1, bgColor)
          : theme.color.white
        : colorTypes
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
        theme.color[`${colorTypes}_lighter`]};

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
