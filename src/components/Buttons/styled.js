import styled, { css } from "styled-components";
import { lighten } from "polished";
import buttonVariants from "../../styles/variants/buttonVariants";

const getBackgroundColor = ({ colorTypes, bgColor, theme, outlined }) => {
  if (outlined) return bgColor || theme.color.white;
  return colorTypes ? theme.color[colorTypes] : bgColor || theme.color.grayScale[50];
};

const getBorderColor = ({ outlined, bgColor, theme, colorTypes }) => {
  if (!outlined) return null;
  return colorTypes ? theme.color[colorTypes] : bgColor || theme.color.grayScale[400];
};

const getTextColor = ({ outlined, theme, colorTypes, color }) => {
  if (color) return color;
  if (outlined) return colorTypes ? theme.color[colorTypes] : theme.color.grayScale[400];
  return colorTypes ? theme.color.white : theme.color.grayScale[200];
};

const getHoverBackgroundColor = ({ colorTypes, bgColor, theme, outlined }) => {
  if (outlined) return bgColor ? lighten(0.1, bgColor) : theme.color.white;
  return colorTypes
    ? lighten(0.1, theme.color[colorTypes])
    : bgColor
    ? lighten(0.1, bgColor)
    : lighten(0.2, theme.color.grayScale[50]);
};

export const StyledButton = styled.button`
  display: inline-flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;

  background-color: ${getBackgroundColor};
  border: ${({ outlined }) => (outlined ? "1px solid" : "none")};
  border-color: ${getBorderColor};
  color: ${getTextColor};

  &:hover {
    background-color: ${getHoverBackgroundColor};
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
