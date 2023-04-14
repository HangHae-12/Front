import { useState } from "react";
import { StyledButton } from "./styled";

export const CustomButton = ({
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
    <StyledButton
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
    </StyledButton>
  );
};


const Buttons = {
  Attendance: (props) => <StyledButton buttonsTypes="Attendance" {...props} />,
  State: (props) => <StyledButton buttonsTypes="State" {...props} />,
  NB: (props) => <StyledButton buttonsTypes="NB_Button" {...props} />,
  Filter: (props) => <StyledButton buttonsTypes="Filter_All" {...props} />,
  Time: (props) => (
    <StyledButton
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      buttonsTypes="Time_Button" {...props} />
  ),
  AB: (props) => <StyledButton buttonsTypes="AB_Button" {...props} />,
};

export default Buttons;
