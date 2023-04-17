import axios from "axios";
import tokenCookie from "../utils/tokenCookie";
import { ENV } from "../helpers/envs";

const instance = axios.create({
  baseURL: `${ENV.main_server}`,
});

let isAlertDisplayed = false;

instance.interceptors.request.use(
  function (config) {
    const token = tokenCookie.get();
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  function (error) {
    if (
      error.response &&
      error.response.data.message === "인가되지 않은 사용자입니다."
    ) {
      tokenCookie.remove();
      if (!isAlertDisplayed) {
        isAlertDisplayed = true;
        alert(
          "로그인이 만료되었거나 인가되지 않은 사용자 입니다. 다시 로그인 해주세요."
        );
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
