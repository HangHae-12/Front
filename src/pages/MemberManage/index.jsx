import styled from "styled-components";
import SideBar from "../../components/SideBar";
import List from "./List"
const MemberManage = () => {

  return (
    <StyledContainer>
      <StyledLeftContainer>
        <SideBar />
      </StyledLeftContainer>
      <StyledRightContainer>
        <List />
      </StyledRightContainer >
    </StyledContainer >
  );
};

export default MemberManage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledLeftContainer = styled.div`
  width: 200px;
  height: 100vh;
`;

const StyledRightContainer = styled.div`
  flex-grow: 1;
  margin-top: 60px;
  margin-bottom: 94px;
  margin-left: 150px;
  margin-right: 150px;
`;