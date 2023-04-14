import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";

registerLocale("ko", ko);

const AbsenceDatePicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (date) => {
    onDateChange(date);
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <StyledDateBox onClick={onClick} ref={ref}>
      <FiCalendar />
      <span>{value}</span>
    </StyledDateBox>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      customInput={<CustomInput />}
      dateFormat="yyyy.MM.dd"
      locale="ko"
    />
  );
};

export default AbsenceDatePicker;

const StyledDateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grayScale[500]};
  cursor: pointer;
`;
