import React from "react";
import styled from "styled-components";
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