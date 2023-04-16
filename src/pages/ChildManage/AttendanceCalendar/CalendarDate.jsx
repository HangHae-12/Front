import moment from "moment";
import styled from "styled-components";
import textVariants from "../../../styles/variants/textVariants";

const CalendarDate = ({ date }) => {
  const headerDate = moment(date).format("D");
  return (
    <StyledMyMonthDateHeader>
      <span>{headerDate}</span>
    </StyledMyMonthDateHeader>
  );
};

const StyledMyMonthDateHeader = styled.div`
  ${textVariants.Body1_Bold}
  display: flex;
  width: 142px;
  padding: 12px 15px;

  color: ${({ theme }) => theme.color.grayScale[500]};
`;

export default CalendarDate;
