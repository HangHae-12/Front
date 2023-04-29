import { useNavigate } from "react-router-dom";
import axios from "axios";
import tokenCookie from "../../utils/tokenCookie";
import session from "../../utils/session";
import SignAPI from "../../api/SignAPI";
import useKakaoAPI from "../../hooks/useKakaoAPI";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    tokenCookie.set(res.headers.authorization);
    session.set("user", res.data.data);
    switch (res.data.statusCode) {
      case 200:
        // 아직 추가정보를 입력하지 않은 상태
        navigate("/signup");
        break;
      case 202:
        // 정보입력 후 미승인 상태
        navigate("/signup/success");
        break;
      case 203:
        // 원장 선생님이 정보를 입력했지만 유치원은 생성하지 않은 상태
        navigate("/signup/registration/info");
        break;
      default:
        //  승인까지 완료
        navigate("/host");
        break;
    }
  };
  const onError = (error) => {
    if (axios.isCancel(error)) {
      alert("요청이 취소되었습니다. 확인 후 다시 로그인을 시도해주세요.");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  useKakaoAPI(onSuccess, onError, SignAPI.kakaoAuth);

  return <></>;
};

export default KakaoLogin;
