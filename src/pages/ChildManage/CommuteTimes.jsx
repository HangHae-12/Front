import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import StyledChildManage from "./styled";

const CommuteTimes = () => {
  return (
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
  );
};

export default CommuteTimes;

const ChildCommuteTimesWrapper = styled(StyledChildManage.Card)`
  width: 400px;
  /* padding: 40px 95px; */
`;
