import React, { useState } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import AbsenceDatePicker from "./AbsenceDatePicker";

const DatePickerBox = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <AbsenceDateWrapper>
      <AbsenceDatePicker
        selectedDate={startDate}
        onDateChange={(date) => setStartDate(date)}
      />
      ~
      <AbsenceDatePicker
        selectedDate={endDate}
        onDateChange={(date) => setEndDate(date)}
      />
    </AbsenceDateWrapper>
  );
};

export default DatePickerBox;

const AbsenceDateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const StyledDateBox = styled.div`
  ${textVariants.Body1_SemiBold}
  display: flex;
  width: min-content;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grayScale[500]};
`;
