import styled from "styled-components";
import { FaSchool } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { DUMMY_PROFILE_IMG_SRC } from "../assets";

const SideBar = () => {
  return (
    <StyledSideBarContainer>
      <StyledUserProfileWrapper>
        <img src={DUMMY_PROFILE_IMG_SRC} alt="유저 프로필 이미지" />
        <p>학부모</p>
        <h4>박미자</h4>
      </StyledUserProfileWrapper>
      <StyledSideBarBtnWrapper>
        {/* 버튼 컴포넌트로 리팩토링 할 부분 */}
        <button className="btn-kindergarden">
          <FaSchool />
          <span>유치원</span>
        </button>
        <button className="btn-profile">
          <HiUserCircle />
          <span>프로필</span>
        </button>
      </StyledSideBarBtnWrapper>
    </StyledSideBarContainer>
  );
};

export default SideBar;

const StyledSideBarContainer = styled.aside`
  position: fixed;
  left: 0;
  z-index: 5;
  width: 180px;
  height: 100%;
  padding: calc(80px + 30px) 20px 0px 20px;
  border: 1px solid ${({ theme }) => theme.color.gray_300};
  background-color: ${({ theme }) => theme.color.white};
`;

const StyledUserProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_300};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray_100};
    margin: 10px 0px 5px 0px;
  }

  h4 {
    font-size: 14px;
  }
`;

const StyledSideBarBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  gap: 10px;

  button {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 4px;
    font-size: 25px;
    span {
      font-size: 15px;
    }
  }

  .btn-kindergarden {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.white};
  }

  .btn-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.color.gray_400};
    color: ${({ theme }) => theme.color.gray_100};
  }
`;
