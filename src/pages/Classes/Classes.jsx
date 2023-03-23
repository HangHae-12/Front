import React from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import ClassButton from "./ClassButton";

function Class() {
  return (
    <>
      <SideBar />
      <StyledClassesWrapper>
        <ClassButton />
      </StyledClassesWrapper>
    </>
  );
}

export default Class;

const StyledClassesWrapper = styled.div`
  background: #e5e5e5;
  margin-left: 200px;
`;
