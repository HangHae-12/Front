import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SignAPI from "../../api/SignAPI";
import tokenCookie from "../../utils/tokenCookie";
import session from "../../utils/session";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    setCode(code);
  }, [location]);

  useEffect(() => {
    if (!code) return;
    const source = axios.CancelToken.source();
    const request = SignAPI.kakaoAuth(code, source.token);

    request
      .then((res) => {
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
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          alert("요청이 취소되었습니다. 확인 후 다시 로그인을 시도해주세요.");
          navigate("/login");
        } else {
          navigate("/login");
        }
      });

    return () => {
      source.cancel("인증 요청이 취소되었습니다.");
    };
  }, [code]);

  return <></>;
};

export default KakaoLogin;
