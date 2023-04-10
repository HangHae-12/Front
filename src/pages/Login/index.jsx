import styled from "styled-components";
import useRemoveToken from "../../hooks/useRemoveToken";
import { ENV } from "../../helpers/envs";
import ASSETS from "../../helpers/assets";
import TextVariants from "../../styles/variants/textVariants";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code`;
  useRemoveToken();
  return (
    <StyledLogin.Background>
      <StyledLogin.Container>
        <StyledLogin.Wrapper>
          <img src={ASSETS.big_logo} alt="킨더그루_로고" />
          <h3>"안전하고 편리한 유치원 출결관리의 시작"</h3>
          <a href={KAKAO_AUTH_URL}>
            <img src={ASSETS.kakao_login_btn} alt="카카오_로그인_버튼" />
          </a>
        </StyledLogin.Wrapper>
      </StyledLogin.Container>
    </StyledLogin.Background>
  );
};
export default Login;

const StyledLogin = {
  Background: styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.green_darker};
  `,

  Container: styled.section`
    display: flex;
    width: 862px;
    height: 518px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.white};
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
  `,

  Wrapper: styled.div`
    width: min-content;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      ${TextVariants.Body3_SemiBold}
      font-size: 20px;
      white-space: nowrap;
      color: ${({ theme }) => theme.color.primary};
      margin: 20px 0px 64px 0px;
    }
  `,
};
