import React from "react";
import StyledLogin from "../../styled";
import StyledUser from "../styled";

const InputField = ({
  label,
  id,
  value,
  isEssential,
  placeholder,
  readOnly,
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
    <StyledUser.ContentsWrapper>
      <StyledLogin.Label htmlFor={id} isEssential={isEssential}>
        {label}
      </StyledLogin.Label>
      <StyledLogin.Input
        placeholder={placeholder}
        type={type}
        value={value}
        {...registerOptions}
        id={id}
        defaultValue={defaultValue}
        valid={valid}
        size={size}
        onInput={onInput}
        readOnly={readOnly}
      />
      {!isSubmitSuccessful && errors && (
        <StyledUser.ErrorMessage>{errors.message}</StyledUser.ErrorMessage>
      )}
    </StyledUser.ContentsWrapper>
  );
};

export default InputField;
