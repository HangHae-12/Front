import React from "react";
import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";
import textVariants from "../../styles/variants/textVariants";

const AbsenceBox = ({ absenceData }) => {
  const formattedDate = (date) => date.replaceAll("-", ".");
  console.log(absenceData);
  const { id, startDate, endDate, reason } = absenceData;

  return (
    <StyledAbsenceContainer>
      <h3>{reason}</h3>
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
    </StyledAbsenceContainer>
  );
};

export default AbsenceBox;

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

const StyledAbsenceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 86px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
  border-radius: 4px;
  gap: 10px;

  h3 {
    ${textVariants.Body1_Bold}
    width: 100%;
    text-align: start;
    padding: 0px 45px;
    color: ${({ theme }) => theme.color.grayScale[600]};
  }
`;

const AbsenceDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
