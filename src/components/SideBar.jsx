import styled from "styled-components";
import { DUMMY_PROFILE_IMG_SRC } from "../assets";

const SideBar = () => {
  return (
    <StyledSideBarContainer>
      <StyledUserProfileWrapper>
        <img src={DUMMY_PROFILE_IMG_SRC} alt="유저 프로필 이미지" />
        <p>학부모</p>
        <h4>박미자</h4>
      </StyledUserProfileWrapper>
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
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray_3};
`;

const StyledUserProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_3};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray_1};
  }
`;
