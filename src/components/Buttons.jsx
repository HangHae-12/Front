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
    width: 48px;
    height: 24px;
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
    /* min-width: 79px;
    min-height: 32px; */
    padding: 10px 12px;
    border-radius: 4px;
  `,

  Time_Button: css`
    ${textVariants.Body1_SemiBold}
    /* min-width: 140px;
    min-height: 46px; */
    padding: 8px 12px;
    border-radius: 24px;
  `,

  AB_Button: css`
    ${textVariants.H3_SemiBold}
    /* min-width: 114px;
    min-height: 54px; */
    padding: 12px 20px;
  `,
};

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width || "max-content"};
  height: ${({ height }) => height || "max-content"};
  /* buttonsTypes 에 해당하는 width, height 값이 없다면 직접 지정. 없다면 기본값 max-content */

  background-color: ${({ colorTypes, bgColor, theme }) =>
    colorTypes
      ? theme.color[colorTypes]
      : bgColor || theme.color.grayScale[50]};
  /* colorTypes가 있으면 colorTypes, 없다면 bgColor를 체크. 그것도 없다면 기본값 grayScale[50] */

  border: ${({ outlined }) => (outlined ? "1px solid" : "none")};
  border-color: ${({ outlined, bgColor, theme }) =>
    outlined ? bgColor : theme.color.grayScale[400]};
  color: ${({ outlined, theme, colorTypes }) =>
    outlined
      ? theme.color.grayScale[400]
      : colorTypes === "State"
      ? theme.color[colorTypes]
      : colorTypes
      ? theme.color.white
      : theme.color.grayScale[200]};

  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${
      ({ colorTypes, bgColor, theme }) =>
        console.log(
          theme.color[colorTypes],
          transColor.lighten(theme.color[colorTypes]),
          0.3
        )
      // colorTypes
      //   ? transColor.lighten(theme.color[colorTypes], 0.3)
      //   : bgColor
      //   ? transColor.lighten("#303030", 0.9)
      //   : transColor.lighten("#303030", 0.9)};
    };
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.color.grayScale[50]};
      color: ${({ theme }) => theme.color.grayScale[200]};
      opacity: 70%;
      pointer-events: none;
    `}

  ${({ buttonsTypes }) => ButtonsVariants[buttonsTypes] || ""}
  white-space: nowrap
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
