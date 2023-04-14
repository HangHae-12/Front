import StyledChildManage from "./styled";
import ChildProfile from "./ChildProfile";
import CommuteTimes from "./CommuteTimes";
import AbsenceManage from "./AttendanceManage";

const ChildManage = () => {
  return (
    <StyledChildManage.Container>
      <StyledChildManage.Header>아이 관리</StyledChildManage.Header>
      <StyledChildManage.Section>
        <ChildProfile />
        <CommuteTimes />
      </StyledChildManage.Section>
      <StyledChildManage.Section>
        <AbsenceManage />
      </StyledChildManage.Section>
    </StyledChildManage.Container>
    
  );
};

export default ChildManage;
