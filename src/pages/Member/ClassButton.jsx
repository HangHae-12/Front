import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import TeacherInformation from "./TeacherInformation";
import { MemberAPI } from "../../api/MemberAPI";
import ClassMember from "./ClassMember";
import Gallery from "./Gallery";
import Button from "../../components/Button";
import { BsFillGearFill } from "react-icons/bs";
import textVariants from "../../styles/variants/textVariants";
import Buttons from "../../components/Buttons";
import { useQuery } from "@tanstack/react-query";
import { ClassMangeModal } from "./ClassModal";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal";
import { useRecoilValue, useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { kindergartenAtom, userProfileAtom } from "../../atom/sideBarAtom";
import { classesAtom, classButtonAtom } from "../../atom/classesAtom";

const ClassButton = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const { openModal, closeModal } = useModal();
  const { id } = useParams();
  const userRole = useRecoilValue(userProfileAtom);
  const kindergartenId = useRecoilValue(kindergartenAtom);
  const classesInfor = useRecoilValue(classesAtom);
  const [render, setRender] = useState(true);
  const [classInfor, setClassInfor] = useRecoilState(classButtonAtom);

  const { data } = useQuery(
    ["classesPage", kindergartenId.id, id || "-1"],
    () => MemberAPI.getClassesPage(kindergartenId.id, id || "-1"),
    {
      onSuccess: (data) => {
        const everyClass = data.data.data.everyClass;
        const classInfo = everyClass.map((classObj) => ({
          id: classObj.id,
          name: classObj.name,
        }));
        setClassInfor(classInfo);
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const setClassModal = () => {
    const modalData = {
      title: <StyledClassMangeHeader>반 관리</StyledClassMangeHeader>,
      contents: <ClassMangeModal />,
      footer: null,
      width: "484px",
      height: "500px",
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };

  useEffect(() => {
    if (!render) {
      setClassModal();
    } else {
      setRender(false);
    }
  }, [classesInfor]);

  useEffect(() => {
    const storedSelectedTab = localStorage.getItem("selectedTab");
    if (storedSelectedTab) {
      setSelectedTab(storedSelectedTab);
    } else {
      setSelectedTab("member");
    }
  }, []);

  useEffect(() => {
    if (data?.data?.data.everyClass && data?.data?.data.everyClass.length > 0) {
      const storedSelectedButton = localStorage.getItem("selectedButton");
      const storedSelectedButtonId = localStorage.getItem("selectedButtonId");

      if (storedSelectedButton && storedSelectedButtonId) {
        setSelectedButton(storedSelectedButton);
        navigate(`/classes/${storedSelectedButtonId}`);
      } else {
        const firstClass = data?.data?.data.everyClass[0];
        setSelectedButton(firstClass.name);
        localStorage.setItem("selectedButton", firstClass.name);
        localStorage.setItem("selectedButtonId", firstClass.id);
        navigate(`/classes/${firstClass.id}`);
      }
    }
  }, [data]);

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
    localStorage.setItem("selectedButton", selected);
    localStorage.setItem("selectedButtonId", id);
    navigate(`/classes/${id}`);
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <StyledInputWrapper>
        <StyledHeaderWrapper>
          <StyledHeaderFont>학급관리</StyledHeaderFont>
          {userRole.role === "PRINCIPAL" ? (
            <StyledGearButton marginLeft="5px" onClick={setClassModal} />
          ) : null}
        </StyledHeaderWrapper>
      </StyledInputWrapper>

      <StyledButtonWrapper>
        {data?.data?.data.everyClass.map((item) => {
          return (
            <Button.ClassButton
              selected={item.name}
              selectedButton={selectedButton}
              onClick={() => handleButtonClick(item.name, item.id)}
            />
          );
        })}
      </StyledButtonWrapper>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
      >
        <TeacherInformation data={data} />
      </motion.div>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
      >
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
        <Modal />
      </motion.div>
    </>
  );
};

export default ClassButton;

const StyledButtonWrapper = styled.div`
  padding-bottom: 10px;
`;

const StyledHeaderFont = styled.div`
  ${textVariants.H2_Bold}
  display: flex;
  align-items: center;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  margin-left: 5px;
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
