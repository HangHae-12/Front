import React, { useState, useEffect } from "react";
import StyledCustomDatePicker from "./styled"
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { SlCalender } from "react-icons/sl"
registerLocale("ko", ko);

const CustomDatepicker = ({ mode, selectedDate, onDateChange }) => {

    const handleDateChange = (date) => {
        onDateChange(date);
    };

    const datePickerProps = {
        selected: selectedDate,
        onChange: handleDateChange,
        customInput: <CustomInput />,
        dateFormat: mode === "month" ? "yyyy년 MM월" : "yyyy년 MM월 dd일",
        locale: "ko",
        wrapperClassName: "hidden",
        showMonthYearPicker: mode === "month",
    };

    return (
        <StyledCustomDatePicker>
            <DatePicker {...datePickerProps} />
        </StyledCustomDatePicker>
    );
};

export default CustomDatepicker;

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <SlCalender onClick={onClick} ref={ref} className="hidden" />
));