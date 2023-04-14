import DateBox from "./DateBox";
import Buttons from "../../components/Buttons";
import { useRecoilState } from "recoil";
import { childListAtom } from "../../atom/sideBarAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ChildManageAPI from "../../api/ChildManageAPI";
import useModal from "../../hooks/useModal";
import StyledAbsenceModal from "./StyledAbsenceModal";

const AbsenceInfoModal = ({ absent }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const { id, startDate, endDate, reason } = absent;
  const childId = useRecoilState(childListAtom)[0][0]?.childId;

  const { mutate: deleteAttendance } = useMutation(
    ChildManageAPI.deleteChildAttendance,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["AttendanceManage"]);
        closeModal();
      },
      onError: () => {},
    }
  );

  const handleAbsenceDelete = () => {
    deleteAttendance({ childId: childId, absentId: id });
  };

  const { mutate } = useMutation(ChildManageAPI.requestChildAttendance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["AttendanceManage"]);
      closeModal();
    },
    onError: () => {},
  });

  return (
    <StyledAbsenceModal.Container>
      <StyledAbsenceModal.Wrapper>
        <StyledAbsenceModal.SubTitle>결석 기간</StyledAbsenceModal.SubTitle>
        <DateBox startDate={startDate} endDate={endDate} />
      </StyledAbsenceModal.Wrapper>
      <StyledAbsenceModal.Wrapper>
        <StyledAbsenceModal.SubTitle>결석 사유</StyledAbsenceModal.SubTitle>
        <StyledAbsenceModal.ReasonBox>{reason}</StyledAbsenceModal.ReasonBox>
      </StyledAbsenceModal.Wrapper>
      <StyledAbsenceModal.BtnWrapper>
        <Buttons.Filter
          outlined
          colorTypes="primary"
          onClick={handleAbsenceDelete}
        >
          취소 하기
        </Buttons.Filter>
      </StyledAbsenceModal.BtnWrapper>
    </StyledAbsenceModal.Container>
  );
};

export default AbsenceInfoModal;
