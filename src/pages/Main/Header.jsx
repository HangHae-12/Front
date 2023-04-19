import { ENV } from "../../helpers/envs";
import ASSETS from "../../helpers/assets";

const Header = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${ENV.kakao_key}&redirect_uri=${ENV.kakao_redirect}&response_type=code&scope=profile_nickname,profile_image,friends,talk_message`;
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src={ASSETS.kakaologin_btn} alt="카카오_로그인_버튼" />
    </a>
  );
};

export default Header;


