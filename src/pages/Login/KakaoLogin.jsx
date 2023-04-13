import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignAPI } from "../../api/SignAPI";
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
            navigate("/signup");
            break;
          case 202:
            navigate("/signup/success");
            break;
          default:
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
