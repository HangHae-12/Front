import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import instance from "../../../api/instance";
import { SignAPI } from "../../../api/signAPI";

// const { Kakao } = window;
// Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);

const KakaoLogin = () => {
  const location = useLocation();
  const code = location.search.split("=")[1];
  const authKakao = async () => {
    try {
      const res = await instance.get(`auth/kakao/callback?code=${code}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    // const loginError = location.search.includes("error");
    // const response = await SignAPI.requestKakaoToken(code);
    // console.log(response);
  };

  useEffect(() => {
    authKakao();
  }, []);
  return <></>;
};

export default KakaoLogin;
