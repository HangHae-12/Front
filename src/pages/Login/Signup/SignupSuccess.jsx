import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { DUMMY_URL } from "../../../helpers/dummyUrl";
import StyledLogin from "../styled";
import Buttons from "../../../components/Buttons";

const SignupSuccess = () => {
  const location = useLocation();
  const { name, profileImageUrl } = location.state;
  console.log(location.state);
  console.log(name, profileImageUrl);
  return (
    <StyledSignupSuccess.Container>
      <img
        src={profileImageUrl ?? DUMMY_URL.not_profile_img}
        alt="프로필_이미지"
      />
      <StyledLogin.Title>
        축하합니다 <strong>{name ?? "사용자"}</strong> 님!
      </StyledLogin.Title>
      <StyledLogin.Title>회원가입이 완료되었습니다.</StyledLogin.Title>
      <Link to="/host">
        <Buttons.AB colorTypes="primary">킨더그루 이용하러가기</Buttons.AB>
      </Link>
    </StyledSignupSuccess.Container>
  );
};

export default SignupSuccess;

const StyledSignupSuccess = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 110px 0px;

    strong {
      color: ${({ theme }) => theme.color.primary};
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-bottom: 28px;
    }

    button {
      width: min-content;
      margin-top: 40px;
    }
  `,
};
