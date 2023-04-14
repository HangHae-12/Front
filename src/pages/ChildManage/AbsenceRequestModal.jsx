import React, { useState } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import AbsenceRequestDropdown from "./AbsenceRequestDropdown";
import Buttons from "../../components/Buttons";
import { useRecoilState } from "recoil";
import { childListAtom } from "../../atom/sideBarAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import useModal from "../../hooks/useModal";
import DatePickerBox from "./DatePickerBox";
import formattedDate from "../../utils/formattedDate";

const AbsenceRequestModal = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const childId = useRecoilState(childListAtom)[0][0]?.childId;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [absenceReason, setAbsenceReason] = useState("사유를 선택해주세요");

  const { mutate } = useMutation(ChildManageAPI.requestChildAttendance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["AttendanceManage"]);
      closeModal();
    },
    onError: () => {},
  });

  const handleAbsenceRequest = () => {
    mutate({
      childId: childId,
      payload: {
        startDate: formattedDate(startDate),
        endDate: formattedDate(endDate),
        reason: absenceReason,
      },
    });
  };

  return (
    <StyledAbsenceRequestModal.Container>
      <StyledAbsenceRequestModal.Wrapper>
        <StyledAbsenceRequestModal.SubTitle>
          결석 기간
        </StyledAbsenceRequestModal.SubTitle>
        <DatePickerBox
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </StyledAbsenceRequestModal.Wrapper>
      <StyledAbsenceRequestModal.Wrapper>
        <StyledAbsenceRequestModal.SubTitle>
          결석 사유
        </StyledAbsenceRequestModal.SubTitle>
        <AbsenceRequestDropdown
          absenceReason={absenceReason}
          setAbsenceReason={setAbsenceReason}
        />
      </StyledAbsenceRequestModal.Wrapper>
      <StyledAbsenceRequestModal.BtnWrapper>
        <Buttons.Filter
          outlined
          colorTypes="primary"
          onClick={handleAbsenceRequest}
        >
          신청하기
        </Buttons.Filter>
      </StyledAbsenceRequestModal.BtnWrapper>
    </StyledAbsenceRequestModal.Container>
  );
};

export default AbsenceRequestModal;

const StyledAbsenceRequestModal = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0px 10px 20px 10px;
  `,

  SubTitle: styled.h3`
    ${textVariants.Body2_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[600]};
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  BtnWrapper: styled.div`
    text-align: end;
  `,
};
