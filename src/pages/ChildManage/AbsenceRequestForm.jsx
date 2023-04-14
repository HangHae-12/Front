import styled from "styled-components";
import StyledChildManage from "./styled";
import Buttons from "../../components/Buttons";
import AbsenceBox from "./AbsenceBox";
import Modal from "../../components/Modal";

const AbsenceRequestForm = ({ absentData }) => {
  absentData = [
    {
      id: "1",
      startDate: "2023-04-15",
      endDate: "2023-04-17",
      reason: "질병1",
    },
    {
      id: "2",
      startDate: "2023-04-16",
      endDate: "2023-04-17",
      reason: "질병2",
    },
    {
      id: "3",
      startDate: "2023-04-17",
      endDate: "2023-04-17",
      reason: "질병3",
    },
    {
      id: "4",
      startDate: "2023-04-18",
      endDate: "2023-04-17",
      reason: "질병4",
    },
    {
      id: "5",
      startDate: "2023-04-19",
      endDate: "2023-04-17",
      reason: "질병5",
    },
    {
      id: "6",
      startDate: "2023-04-20",
      endDate: "2023-04-17",
      reason: "질병6",
    },
    {
      id: "7",
      startDate: "2023-04-21",
      endDate: "2023-04-17",
      reason: "질병7",
    },
    {
      id: "8",
      startDate: "2023-04-22",
      endDate: "2023-04-17",
      reason: "질병8",
    },
    {
      id: "9",
      startDate: "2023-04-23",
      endDate: "2023-04-17",
      reason: "질병9",
    },
  ];
  return (
    <>
      <StyledAbsenceRequestForm.Container>
        <StyledAbsenceRequestForm.TitleWrapper>
          <StyledAbsenceRequestForm.Title>
            결석 신청 리스트
          </StyledAbsenceRequestForm.Title>
          <Buttons.Filter outlined>결석 신청</Buttons.Filter>
        </StyledAbsenceRequestForm.TitleWrapper>
        <StyledAbsenceRequestForm.AbsentListWrapper>
          {absentData.map((item) => (
            <AbsenceBox key={item.id} absenceData={item} />
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
