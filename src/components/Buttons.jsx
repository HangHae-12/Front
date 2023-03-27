import React from "react";
import styled, { css } from "styled-components";
import { transColor } from "../utils/transColor";
import textVariants from "../styles/textVariants";

const ButtonsVariants = {
  Attendance: css`
    ${textVariants.Body1_SemiBold}
    width: 172px;
    height: 40px;
    padding: 8px 10px;
    border-radius: 8px;
  `,

  State: css`
    ${textVariants.Body2_SemiBold}
    /* width: 48px;
    height: 26px; */
    width: max-content;
    height: max-content;
    padding: 4px;
    border-radius: 20px;
  `,

  NB_Button: css`
    ${textVariants.H2_SemiBold}
    width: 200px;
    height: 60px;
    padding: 12px 10px;
    border-radius: 4px;
  `,

  Filter_All: css`
    ${textVariants.Body1_SemiBold}
    /* width: 79px;
    height: 32px; */
    width: max-content;
    height: max-content;
    padding: 10px 12px;
    border-radius: 4px;
  `,

  Time_Button: css`
    ${textVariants.Body1_SemiBold}
    /* width: 140px;
    height: 46px; */
    width: max-content;
    height: max-content;
    padding: 8px 12px;
    border-radius: 24px;
  `,

  AB_Button: css`
    ${textVariants.H3_SemiBold}
    /* width: 114px;
    height: 54px; */
    /* width: max-content;
    height: max-content; */
    padding: 12px 20px;
  `,
};

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${({ buttonsTypes }) => ButtonsVariants[buttonsTypes] || ""}
  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "max-content"};
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.color.grayScale[50]};
  border: ${({ outlined }) => (outlined ? "1px solid" : "none")};
  border-color: ${({ outlined, bgColor, theme }) =>
    outlined ? bgColor : theme.color.grayScale[400]};
  color: ${({ outlined, theme }) =>
    outlined ? theme.color.grayScale[400] : theme.color.grayScale[200]};

  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ bgColor }) => transColor.lighten(bgColor, 0.2)};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ccc;
      border-color: transparent;
      color: #999;
      pointer-events: none;
    `}
`;

const CustomButton = ({
  width,
  height,
  bgColor,
  disabled,
  outlined,
  children,
  ...props
}) => {
  return (
    <Button
      width={width}
      height={height}
      bgColor={bgColor}
      disabled={disabled}
      outlined={outlined}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
