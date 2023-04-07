import styled from "styled-components";
import CustomDatepicker from ".";
import textVariants from "../../styles/variants/textVariants";

const StyledCustomDatePicker = styled.div`
  .react-datepicker {
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    font-size: 14px;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.color.perple_lighter};
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    padding: 10px;
    text-align: center;
  }

  .react-datepicker__current-month {
    ${textVariants.Body1_SemiBold}
  }

  .react-datepicker__day {
    ${textVariants.Body3_Regular}
    color: ${({ theme }) => theme.color.grayScale[500]};
    outline: none;
  }

  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.color.grayScale[100]};
    cursor: pointer;
  }

  .react-datepicker__day--selected {
    ${textVariants.Body3_SemiBold}
    background-color: ${({ theme }) => theme.color.orange_lighter};
    color: ${({ theme }) => theme.color.white};
  }

  .react-datepicker__day--today {
    ${textVariants.Body3_SemiBold}
    color: ${({ theme }) => theme.color.orange};
  }

  .react-datepicker__navigation {
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    line-height: 1.4;
  }

  .react-datepicker__navigation--previous {
    margin-right: 10px;
  }

  .react-datepicker__navigation--next {
    margin-left: 10px;
  }
`;
export default StyledCustomDatePicker;
