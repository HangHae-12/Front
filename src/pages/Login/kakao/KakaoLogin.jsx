import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SignAPI } from "../../../api/signAPI";

// const { Kakao } = window;
// Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);

const KakaoLogin = () => {
  const location = useLocation();

  const authKakao = async () => {
    const code = location.search.split("=")[1];
    const loginError = location.search.includes("error");
    const response = await SignAPI.requestKakaoToken(code);
    console.log(response);
  };

  useEffect(() => {
    authKakao();
  }, []);
  return <></>;
};

export default KakaoLogin;
