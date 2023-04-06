import React, { useState, useEffect } from "react";
import StyledCustomDatePicker from "./styled"
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { BsCalendarDate } from "react-icons/bs"
registerLocale("ko", ko);

const CustomDatepicker = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <StyledCustomDatePicker>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                customInput={<CustomInput />}
                dateFormat="yyyy년 MM월"
                locale="ko"
                wrapperClassName="hidden"
                showMonthYearPicker
            />
        </StyledCustomDatePicker>
    )
}
export default CustomDatepicker;

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <BsCalendarDate onClick={onClick} ref={ref} className="hidden" />
));