import styled from "styled-components";
import StyledChildManage from "./styled";
import Dropdown from "../../components/Dropdown";
import ChildProfile from "./ChildProfile";
import AttendanceCalendar from "./AttendanceCalendar";

const ChildManage = () => {
  // 수정모드 로직에 대해서 고민해볼 것.
  // 아예 readOnly input -> hook form 으로 처리할건지 아니면 이대로 갈건지

  return (
    <StyledChildManage.Container>
      <StyledChildManage.Header>아이 관리</StyledChildManage.Header>
      {/* <StyledChildManage.Section>
        <ChildProfile />
        <ChildCommuteTimesWrapper>
          <StyledChildManage.Title>등/하원 시간</StyledChildManage.Title>

          <Dropdown buttonLabel="09시~10시" isReadOnly={false}>
            <Dropdown.Item onClick={() => console.log("08~09")}>
              08시~09시
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("09~10")}>
              09시~10시
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("10~11")}>
              10시~11시
            </Dropdown.Item>
          </Dropdown>
        </ChildCommuteTimesWrapper>
      </StyledChildManage.Section> */}
      <AttendanceCalendar />
    </StyledChildManage.Container>
  );
};

export default ChildManage;

const ChildCommuteTimesWrapper = styled(StyledChildManage.Card)`
  width: min-content;
  padding: 40px 95px;
`;
