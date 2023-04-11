import { useState } from "react";
import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { DUMMY_PROFILE_IMG_SRC } from "../assets";
import Buttons from "./Buttons";
import textVariants from "../styles/variants/textVariants";
import logo from "../assets/kindergrew_logo.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [showAttendanceMenu, setShowAttendanceMenu] = useState(false);

  const toggleAttendanceMenu = () => {
    setShowAttendanceMenu(!showAttendanceMenu);
  };

  return (
    <StyledSideBarContainer>
      <StyledLogo>
        <img src={logo} alt="로고 이미지" />
      </StyledLogo>
      <StyledUserProfileWrapper>
        <img src={DUMMY_PROFILE_IMG_SRC} alt="유저 프로필 이미지" />
        <p>학부모</p>
        <h3>
          <span>박미자</span>
          <StyledGearButton />
        </h3>
      </StyledUserProfileWrapper>
      <StyledSideBarBtnWrapper>
        <Buttons.NB colorTypes="primary" width="160px">학급 관리</Buttons.NB>
        <Buttons.NB>등/하원 관리</Buttons.NB>
        <div>
          <Buttons.NB onClick={toggleAttendanceMenu}>출석부 관리</Buttons.NB>
          {showAttendanceMenu && (
            <StyledSubMenu>
              <Link to="/monthAttendance">월별 출석부</Link>
              <Link to="/dayAttendance">일별 출석부</Link>
            </StyledSubMenu>
          )}
        </div>
        <Buttons.NB>멤버 관리</Buttons.NB>
      </StyledSideBarBtnWrapper>
    </StyledSideBarContainer>
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

`
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
    color: ${({ theme }) => theme.color.grayScale[500]};
  }

  h3 {
    ${textVariants.H3_SemiBold}
    margin-top: 4px;
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

const StyledSideBarBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  gap: 12px;
`;
const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  gap: 14px;

  a {
    ${textVariants.Body1_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[400]};
    padding: 8px 0px;
    width: 100%;
    text-align: center;
    border-radius: 8px;

    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
