import React from "react";
import styled from "styled-components";

import textVariants from "../../styles/variants/textVariants";
import useModal from "../../hooks/useModal";
import AbsenceInfoModal from "./AbsenceInfoModal";
import AbsenceRequestModalTitle from "./AbsenceRequestModalTitle";
import DateBox from "./DateBox";

const AbsenceBox = ({ absent }) => {
  const { openModal } = useModal();
  const { startDate, endDate, reason } = absent;

  const modalOption = {
    id: `absenceModal`,
    title: <AbsenceRequestModalTitle>결석 정보</AbsenceRequestModalTitle>,
    contents: <AbsenceInfoModal absent={absent} />,
    width: "320px",
    height: "320px",
  };

  return (
    <StyledAbsenceBox.Container onClick={() => openModal(modalOption)}>
      <h3>{reason}</h3>
      <DateBox startDate={startDate} endDate={endDate} />
    </StyledAbsenceBox.Container>
  );
};

export default AbsenceBox;

const StyledAbsenceBox = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 86px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[300]};
    background: ${({ theme }) => theme.color.grayScale[25]};
    border-radius: 4px;
    gap: 10px;

    h3 {
      ${textVariants.Body1_Bold}
      width: 100%;
      text-align: start;
      padding: 0px 45px;
      color: ${({ theme }) => theme.color.grayScale[600]};
    }
  `,
};
