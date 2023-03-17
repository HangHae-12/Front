import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { DUMMY_IMG_SRC } from "../assets";

const NavBar = () => {
  return (
    <>
      <StyledContainer>
        <StyledLogoWrapper>
          <img src={DUMMY_IMG_SRC} alt="서비스 로고" />
          <h4>서비스 이름</h4>
        </StyledLogoWrapper>
        <StyledBrandWrapper>
          {/* 버튼 컴포넌트로 리펙토링 할 부분 */}
          <button className="brand">
            <img src={DUMMY_IMG_SRC} alt="브랜드 로고" />
            <p>스파르타 유치원</p>
          </button>
          <button className="bellBtn">
            <AiOutlineBell />
          </button>
        </StyledBrandWrapper>
      </StyledContainer>
    </>
  );
};

export default NavBar;

const StyledContainer = styled.nav`
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 80px;
  padding: 40px;
  background-color: ${({ theme }) => theme.color.white};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;

const StyledBrandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 24px;
    width: 190px;
    height: 48px;
    border: none;
    border-radius: 24px;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  }

  .bellBtn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    font-size: 28px;
  }
`;
