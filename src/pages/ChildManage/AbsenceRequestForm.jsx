import styled from "styled-components";
import StyledChildManage from "./styled";
import Buttons from "../../components/Buttons";
import AbsenceBox from "./AbsenceBox";
import Modal from "../../components/Modal";
import { useRecoilValue } from "recoil";
import { absentSelector } from "../../atom/attendanceManageAtom";
import useModal from "../../hooks/useModal";
import AbsenceRequestModalTitle from "./AbsenceRequestModalTitle";
import AbsenceRequestModal from "./AbsenceRequestModal";

const AbsenceRequestForm = () => {
  const absentData = useRecoilValue(absentSelector);

  const { openModal } = useModal();
  const modalOption = {
    id: "absenceModal",
    title: <AbsenceRequestModalTitle>결석 신청</AbsenceRequestModalTitle>,
    contents: <AbsenceRequestModal />,
    width: "320px",
    height: "320px",
  };

  const handleRequestAbsence = () => {
    openModal(modalOption);
  };

  return (
    <>
      <StyledAbsenceRequestForm.Container>
        <StyledAbsenceRequestForm.TitleWrapper>
          <StyledAbsenceRequestForm.Title>
            결석 신청 리스트
          </StyledAbsenceRequestForm.Title>
          <Buttons.Filter onClick={handleRequestAbsence} outlined>
            결석 신청
          </Buttons.Filter>
        </StyledAbsenceRequestForm.TitleWrapper>
        <StyledAbsenceRequestForm.AbsentListWrapper>
          {absentData.map((item) => (
            <AbsenceBox key={item.id} absent={item} />
          ))}
        </StyledAbsenceRequestForm.AbsentListWrapper>
      </StyledAbsenceRequestForm.Container>
      <Modal id="absenceModal" />
    </>
  );
};

export default AbsenceRequestForm;

const StyledAbsenceRequestForm = {
  Container: styled(StyledChildManage.Card)`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 400px;
    height: 100%;
    max-height: 600px;
    padding: 0;
  `,

  Title: styled(StyledChildManage.Title)`
    color: ${({ theme }) => theme.color.perple};
  `,

  TitleWrapper: styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 29px;
    background: ${({ theme }) => theme.color.perple_lighter};
    border-bottom: 1px solid ${({ theme }) => theme.color.grayScale[200]};
  `,

  AbsentListWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 32px 20px;
    overflow-y: scroll;
  `,
};
