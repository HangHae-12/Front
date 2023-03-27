import axios from "axios";
import { ENV } from "../helpers/envs";

export const SignAPI = {
  requestKakaoToken: async (code) => {
    try {
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            grant_type: "authorization_code",
            client_id: ENV.kakao_key,
            redirect_uri: ENV.kakao_redirect,
            code: code,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  },

  auth: async (code, cancelToken) => {
    try {
      const response = await axios.get(
        "https://my-frist-server.shop/oauth/kakao/callback",
        // 주소가 확정되면 instance로 수정할 것
        null,
        {
          params: {
            code: code,
          },
          cancelToken: cancelToken,
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  },
};
