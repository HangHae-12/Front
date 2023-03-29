import axios from "axios";
import tokenCookie from "../utils/tokenCookie";
import { ENV } from "../helpers/envs";

const instance = axios.create({
  baseURL: `${ENV.main_server}`,
});

instance.interceptors.request.use(
  function (config) {
    const token = tokenCookie.get();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response && error.response.status === 401) {
      tokenCookie.remove();
      alert("인증이 만료되었습니다. 다시 로그인 해주세요.");
    }

    return Promise.reject(error);
  }
);

export default instance;
