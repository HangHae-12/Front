import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TeacherInformation from "./TeacherInformation";
import { MemberAPI } from "../../api/MemberAPI";
import ClassMember from "./ClassMember";
import Gallery from "./Gallery";
import Button from "../../components/Button";
import { BsFillGearFill } from "react-icons/bs";
import textVariants from "../../styles/variants/textVariants";
import Buttons from "../../components/Buttons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ClassAddModal } from "./ClassModal";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";

const ClassButton = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const { openModal, closeModal } = useModal();
  const { id } = useParams();

  const { data } = useQuery(
    ["classesPage", id],
    () => MemberAPI.getClassesPage(id),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const handleMemberClick = () => {
    setSelectedTab("member");
  };

  const handleGalleryClick = () => {
    setSelectedTab("gallery");
  };

  const navigate = useNavigate();

  const handleButtonClick = async (selected, id) => {
    setSelectedButton(selected);
    navigate(`/classes/${id}`);
  };

  return (
    <>
      <StyledInputWrapper>
        <StyledHeaderFont>학급관리</StyledHeaderFont>
        <StyledGearButton marginLeft="5px"/>
      </StyledInputWrapper>
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
      <TeacherInformation data={data} />
      {selectedTab === "member" ? (
        <StyledABBtn marginLeft="30px" onClick={handleMemberClick}>
          학급인원
        </StyledABBtn>
      ) : (
        <StyledABButton marginLeft="30px" onClick={handleMemberClick}>
          학급인원
        </StyledABButton>
      )}
      {selectedTab === "gallery" ? (
        <StyledABBtn marginLeft="10px" onClick={handleGalleryClick}>
          갤러리
        </StyledABBtn>
      ) : (
        <StyledABButton marginLeft="10px" onClick={handleGalleryClick}>
          갤러리
        </StyledABButton>
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
   {/* <Modal /> */}
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
  background-color: rgba(237, 245, 238, 0.8);
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
  background: rgba(237, 245, 238, 0.8);
  border-radius: 12px;

  @media (max-width: 1800px) {
    width: calc(7 * (140px + 15px));
    height: 360px;
  }
`;

const StyledGearButton = styled(BsFillGearFill)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-left: ${({ marginLeft }) => marginLeft};
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ marginLeft }) => marginLeft};
`;
