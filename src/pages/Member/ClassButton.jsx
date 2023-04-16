import React, { useState, useEffect } from "react";
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
import { ClassMangeModal } from "./ClassModal";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { useRecoilValue } from "recoil";
import { userProfileAtom } from "../../atom/sideBarAtom";

const ClassButton = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const { openModal, closeModal } = useModal();
  const { id } = useParams();
  const userRole = useRecoilValue(userProfileAtom);

  const { data } = useQuery(
    ["classesPage", id || "1"],
    () => MemberAPI.getClassesPage(id || "1"),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const modalOption = {
    padding: "20px",
    width: "660px",
    height: "837px",
  };

  const setClassModal = () => {
    const modalData = {
      title: <StyledClassMangeHeader>반 관리</StyledClassMangeHeader>,
      contents: <ClassMangeModal />,
      footer: null,
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };

  useEffect(() => {
    const storedSelectedTab = localStorage.getItem("selectedTab");
    if (storedSelectedTab) {
      setSelectedTab(storedSelectedTab);
    } else {
      setSelectedTab("member");
    }
  }, []);

  useEffect(() => {
    setSelectedButton(idToButtonName(id));
  }, [id]);

  const idToButtonName = (id) => {
    switch (id) {
      case "1":
        return "세빛반";
      case "2":
        return "둥둥반";
      case "3":
        return "빛살반";
      default:
        return "세빛반";
    }
  };

  const handleMemberClick = () => {
    setSelectedTab("member");
    localStorage.setItem("selectedTab", "member");
  };

  const handleGalleryClick = () => {
    setSelectedTab("gallery");
    localStorage.setItem("selectedTab", "gallery");
  };

  const navigate = useNavigate();

  const handleButtonClick = (selected, id) => {
    setSelectedButton(selected);
    navigate(`/classes/${id}`);
  };

  return (
    <>
      <StyledInputWrapper>
        <StyledHeaderFont>학급관리</StyledHeaderFont>
        {userRole.role === "PRINCIPAL" ? (
          <StyledGearButton marginLeft="5px" onClick={setClassModal} />
        ) : null}
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
        <ClassMember />
      ) : (
        <ClassMember />
      )}
      <Modal modalOption={modalOption} />
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

const StyledClassMangeHeader = styled.div`
  ${textVariants.Body1_Bold}
  color: ${({ theme }) => theme.color.grayScale[700]};
  display: flex;
  align-items: center;
  justify-content: center;
`;
