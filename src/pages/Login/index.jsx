import useRemoveToken from "../../hooks/useRemoveToken";
import StyledLogin from "./styled";
import { ENV } from "../../helpers/envs";
import ASSETS from "../../helpers/assets";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code`;
  useRemoveToken();
  return (
    <StyledLogin.Background>
      <StyledLogin.Container>
        <StyledLogin.LoginPageWrapper>
          <img src={ASSETS.big_logo} alt="킨더그루_로고" />
          <h3>"안전하고 편리한 유치원 출결관리의 시작"</h3>
          <a href={KAKAO_AUTH_URL}>
            <img src={ASSETS.kakao_login_btn} alt="카카오_로그인_버튼" />
          </a>
        </StyledLogin.LoginPageWrapper>
      </StyledLogin.Container>
    </StyledLogin.Background>
  );
};
export default Login;
