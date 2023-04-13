import { useState } from "react";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import textVariants from "../../styles/variants/textVariants";
import logo from "../../assets/kindergrew_logo.png";
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import ProfileModal from "./ProfileModal";
import { useQuery } from "@tanstack/react-query";
import { SideBarAPI } from "../../api/SideBarAPI";
import { useRecoilState } from "recoil";
import { kindergartenAtom, userProfileAtom } from "../../atom/sideBarAtom";
import TeacherSideBar from "./TeacherSideBar";
import PrincipalSideBar from "./PrincipalSideBar";
import ParentSidBar from "./ParentSideBar"

const SideBar = () => {

  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [kindergarten, setKindergarten] = useRecoilState(kindergartenAtom);
  const { openModal } = useModal();
  const { data } = useQuery(
    ["getUserProfile"],
    () => SideBarAPI.getUserProfile(),
    {
      onSuccess: (data) => {
        const bindData = data.data.data;
        setUserProfile({
          ...userProfile,
          birthday: bindData.userProfile.birthday,
          email: bindData.userProfile.email,
          name: bindData.userProfile.name,
          phoneNumber: bindData.userProfile.phoneNumber,
          profileImageUrl: bindData.userProfile.profileImageUrl,
          resolution: bindData.userProfile.resolution,
          role: bindData.userProfile.role,
        });
        setKindergarten({
          ...kindergarten,
          address: bindData.kindergarten.address,
          id: bindData.kindergarten.id,
          logoImageUrl: bindData.kindergarten.logoImageUrl,
          name: bindData.kindergarten.name,
        });
      },
      onError: () => {
        console.log("error");
      },
    }
  );
  const setProfileModal = () => {
    const modalData = {
      title: <StyledModalHeader>사용자 프로필</StyledModalHeader>,
      contents: <ProfileModal />,
      footer: <></>,
      width: "640px",
      height: "392px",
      callback: () => alert("modal"),
    };
    openModal(modalData);
  };

  return (
    <>
      <StyledSideBarContainer>
        <StyledLogo>
          <img src={logo} alt="로고 이미지" />
        </StyledLogo>
        <StyledKinderLogo>
          <img src={kindergarten.logoImageUrl} alt="유저 프로필 이미지" />
          <p>{kindergarten.name}</p>
        </StyledKinderLogo>
        <StyledUserProfileWrapper>
          <img src={userProfile.profileImageUrl} alt="유저 프로필 이미지" />
          <p>{
            userProfile.role === "PRINCIPAL"
              ? "원장선생님"
              : userProfile.role === "TEACHER"
                ? "선생님"
                : "학부모"
          }</p>
          <h3>
            <span>{userProfile.name}</span>
            <StyledGearButton onClick={setProfileModal} />
          </h3>
        </StyledUserProfileWrapper>
        {
          userProfile.role === "PRINCIPAL"
            ? <PrincipalSideBar />
            : userProfile.role === "TEACHER"
              ? <TeacherSideBar />
              : <ParentSidBar />
        }
      </StyledSideBarContainer>
      <Modal />
    </>
  );
};

export default SideBar;

const StyledSideBarContainer = styled.aside`
  position: fixed;
  z-index: 5;
  display: flex;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 80px 0px 200px 0px;
  border-right: 2px solid ${({ theme }) => theme.color.grayScale[100]};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
`;
const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 122px;
  height: 48px;
  margin-bottom: 20px;
`;

const StyledKinderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  width: 130px;
  height: 32px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 3px;
  }

  p {
    ${textVariants.Body2_SemiBold}
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: ${({ theme }) => theme.color.grayScale[500]};
  }
`;


const StyledUserProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  flex-direction: column;
  align-items: center;
  margin-top: 84px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  p {
    ${textVariants.Body2_Bold}
    margin-top: 16px;
    color: ${({ theme }) => theme.color.grayScale[400]};
  }

  h3 {
    ${textVariants.H3_SemiBold}
    margin-top: 11px;
    color: ${({ theme }) => theme.color.grayScale[600]};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const StyledGearButton = styled(BsFillGearFill)`
  width: 16px;
  height: 16px;
`;

const StyledModalHeader = styled.div`
  ${textVariants.Body1_SemiBold}
  color: ${({ theme }) => theme.color.grayScale[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
