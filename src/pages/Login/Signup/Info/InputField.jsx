// InputField.js
import React from "react";
import StyledLogin from "../../styled";
import StyledInfo from "./styled";

const InputField = ({
  label,
  id,
  isEssential,
  placeholder,
  type,
  registerOptions,
  defaultValue,
  valid,
  size,
  onInput,
  errors,
  isSubmitSuccessful,
}) => {
  return (
    <StyledInfo.ContentsWrapper>
      <StyledLogin.Label htmlFor={id} isEssential={isEssential}>
        {label}
      </StyledLogin.Label>
      <StyledLogin.Input
        placeholder={placeholder}
        type={type}
        {...registerOptions}
        id={id}
        defaultValue={defaultValue}
        valid={valid}
        size={size}
        onInput={onInput}
      />
      {!isSubmitSuccessful && errors && (
        <StyledInfo.ErrorMessage>{errors.message}</StyledInfo.ErrorMessage>
      )}
    </StyledInfo.ContentsWrapper>
  );
};

export default InputField;
