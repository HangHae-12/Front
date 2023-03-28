import React from "react";
import styled, { css } from "styled-components";
import { lighten } from "polished";
import sizeVariants from "../styles/variants/sizeVariants";

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

  color: ${({ outlined, theme, colorTypes, color }) =>
    color
      ? color // color가 존재할 경우 해당 색상을 사용한다.
      : outlined
      ? theme.color.grayScale[400] // outlined가 true일 경우 회색 400 색상을 사용한다.
      : colorTypes
      ? theme.color.white // colorTypes가 존재할 경우 흰색을 사용한다.
      : theme.color.grayScale[200]}; // 그렇지 않으면 회색 200 색상을 사용한다.

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
      /* State 버튼은 호버 이팩트가 필요하지 않음 */
    `}

  

  ${({ buttonsTypes }) => sizeVariants[buttonsTypes] || ""}
  /* buttonsTypes 로 입력받은 Variants에 대한 스타일 적용 */
  opacity: ${({ opacity }) => opacity};
  transition: background-color 0.3s ease-in-out;
  white-space: nowrap;
  cursor: pointer;
`;

const CustomButton = ({
  width,
  height,
  bgColor,
  opacity,
  disabled,
  outlined,
  colorTypes,
  buttonsTypes,
  children,
  ...props
}) => {
  return (
    <Button
      width={width}
      height={height}
      opacity={opacity}
      bgColor={bgColor}
      disabled={disabled}
      outlined={outlined}
      colorTypes={colorTypes}
      buttonsTypes={buttonsTypes}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
