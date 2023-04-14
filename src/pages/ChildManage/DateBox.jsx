import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";

import textVariants from "../../styles/variants/textVariants";

const DateBox = ({ startDate, endDate }) => {
  const formattedDate = (date) => date.replaceAll("-", ".");

  return (
    <AbsenceDateWrapper>
      <StyledDateBox>
        <FiCalendar />
        <span>{formattedDate(startDate)}</span>
      </StyledDateBox>
      ~
      <StyledDateBox>
        <FiCalendar />
        <span>{formattedDate(endDate)}</span>
      </StyledDateBox>
    </AbsenceDateWrapper>
  );
};

export default DateBox;

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
