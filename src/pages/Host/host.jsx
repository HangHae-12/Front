import styled from "styled-components";
import SideBar from "../../components/SideBar";
import ClassButtonGroup from './ClassButtonGroup'

const Host = () => {

  return (
    <StyledContainer>
      <StyledLeftContainer>
        <SideBar />
      </StyledLeftContainer>
      <StyledRightContainer>
        <ClassButtonGroup />
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default Host;

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
  margin-top: 20px;
  margin-left: 60px;
`;

