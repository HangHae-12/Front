import { ENV } from "../../helpers/envs";

const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code`;
  return (
    <>
      <a href={KAKAO_AUTH_URL}>
        <button>KAKAO</button>
      </a>
    </>
  );
};
export default Login;
