import axios from "axios";
import { useTokenCookie } from "../hooks/useTokenCookie";
import { ENV } from "../helpers/envs";

const instance = axios.create({
  baseURL: `${ENV.main_server}`,
});

const { getTokenCookie, removeTokenCookie } = useTokenCookie();
instance.interceptors.request.use(
  function (config) {
    console.log("인터셉트 요청 성공!");
    const token = getTokenCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("인터셉트 응답 받았어요!");
    return response;
  },

  function (error) {
    console.log("인터셉트 응답 못받았어요");

    if (error.response && error.response.status === 401) {
      removeTokenCookie();
      alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
    }

    return Promise.reject(error);
  }
);

export default instance;
