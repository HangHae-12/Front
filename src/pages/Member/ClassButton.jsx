import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TeacherInformation from "./TeacherInformation";
import ClassMember from "./ClassMember";
import Gallery from "./Gallery";
import Button from "../../components/Button";
import textVariants from "../../styles/variants/textVariants";
import Buttons from "../../components/Buttons";

const ClassButton = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedTab, setSelectedTab] = useState("member");

  const handleMemberClick = () => {
    setSelectedTab("member");
  };

  const handleGalleryClick = () => {
    setSelectedTab("gallery");
  };

  const navigate = useNavigate();

  const handleButtonClick = (selected, id) => {
    setSelectedButton(selected);
    navigate(`/classes/${id}`);
  };

  return (
    <>
      <StyledHeaderFont>학급관리</StyledHeaderFont>
      <StyledButtonWrapper>
        <Button.ClassButton
          selected={"세빛반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("세빛반", 1)}
        />
        <Button.ClassButton
          selected={"둥둥반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("둥둥반", 2)}
        />
        <Button.ClassButton
          selected={"빛살반"}
          selectedButton={selectedButton}
          onClick={() => handleButtonClick("빛살반", 3)}
        />
      </StyledButtonWrapper>
      <TeacherInformation />
      {selectedTab === "member" ? (
        <StyledABBtn onClick={handleMemberClick}>학급인원</StyledABBtn>
      ) : (
        <Buttons.AB onClick={handleMemberClick}>학급인원</Buttons.AB>
      )}
      {selectedTab === "gallery" ? (
        <StyledABBtn onClick={handleGalleryClick}>갤러리</StyledABBtn>
      ) : (
        <StyledABButton onClick={handleGalleryClick}>갤러리</StyledABButton>
      )}
      {selectedTab === "member" ? <ClassMember /> : <Gallery />}
    </>
  );
};

export default ClassButton;

const StyledButtonWrapper = styled.div`
  padding-bottom: 10px;
`;

const StyledHeaderFont = styled.div`
  ${textVariants.H1}
  margin-bottom: 20px;
  margin-top: 29px;
`;

const StyledABBtn = styled(Buttons.AB)`
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.green_darker};
  margin-top: 20px;
`;

const StyledABButton = styled(Buttons.AB)`
  margin-top: 20px;
`
