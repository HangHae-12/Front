import axios from "axios";
import { ENV } from "../helpers/envs";

const instance = axios.create({
  baseURL: `${ENV.server}`,
});

instance.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전 수행
    console.log("인터셉트 요청 성공!");
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 오류 요청을 보내기 전 수행
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("인터셉트 응답 받았어요!");
    // 정상 응답
    return response;
  },

  function (error) {
    console.log("인터셉트 응답 못받았어요");
    return Promise.reject(error);
  }
);

export default instance;
