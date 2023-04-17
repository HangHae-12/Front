import styled from "styled-components";
import useRemoveToken from "../../hooks/useRemoveToken";
import StyledLogin from "./styled";
import { ENV } from "../../helpers/envs";
import ASSETS from "../../helpers/assets";
import textVariants from "../../styles/variants/textVariants";
import tokenCookie from "../../utils/tokenCookie";
import session from "../../utils/session";
import { useEffect } from "react";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code&scope=profile_nickname,profile_image,friends,talk_message`;

  useEffect(() => {
    tokenCookie.remove();
    session.clear();
  }, []);

  return (
    <StyledLogin.Background>
      <StyledLogin.Container>
        <StyledLoginPage.Wrapper>
          <img src={ASSETS.main_logo} alt="킨더그루_로고" />
          <h3>"안전하고 편리한 유치원 출결관리의 시작"</h3>
          <a href={KAKAO_AUTH_URL}>
            <img src={ASSETS.kakao_login_btn} alt="카카오_로그인_버튼" />
          </a>
        </StyledLoginPage.Wrapper>
      </StyledLogin.Container>
    </StyledLogin.Background>
  );
};
export default Login;

const StyledLoginPage = {
  Wrapper: styled.div`
    width: min-content;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      ${textVariants.Body3_SemiBold}
      font-size: 20px;
      white-space: nowrap;
      color: ${({ theme }) => theme.color.primary};
      margin: 20px 0px 64px 0px;
    }
  `,
};
