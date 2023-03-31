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
  const [selectedTab, setSelectedTab] = useState("");

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
        <StyledABBtn marginLeft="30px" onClick={handleMemberClick}>학급인원</StyledABBtn>
      ) : (
        <StyledABButton marginLeft="30px" onClick={handleMemberClick}>학급인원</StyledABButton>
      )}
      {selectedTab === "gallery" ? (
        <StyledABBtn marginLeft="10px" onClick={handleGalleryClick}>갤러리</StyledABBtn>
      ) : (
        <StyledABButton marginLeft="10px" onClick={handleGalleryClick}>갤러리</StyledABButton>
      )}
      {selectedTab === "member" ? (
        <ClassMember />
      ) : selectedTab === "gallery" ? (
        <Gallery />
      ) : selectedTab === "" ? (
        <StyledChildrenWrapper />
      ) : (
        <StyledChildrenWrapper />
      )}
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
  margin-left: ${({ marginLeft }) => marginLeft};
  border-radius: 4px 4px 0px 0px;
`;

const StyledABButton = styled(Buttons.AB)`
  margin-top: 20px;
  margin-left: ${({ marginLeft }) => marginLeft};
  border-radius: 4px 4px 0px 0px;
`;

const StyledChildrenWrapper = styled.div`
  padding: 0px 0px 20px;
  gap: 40px;
  width: calc(7 * (190px + 15px));
  height: 484px;
  background: ${({ theme }) => theme.color.green_darker};
  border-radius: 12px;

  @media (max-width: 1800px) {
    width: calc(7 * (140px + 15px));
    height: 360px;
  }
`;
