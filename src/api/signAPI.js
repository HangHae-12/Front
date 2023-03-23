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

  // test 용 로직입니다.
  requestInfoByAccessToken: async (access_token) => {
    try {
      const response = await axios.get(
        "https://kapi.kakao.com/v1/user/access_token_info",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  },
};
