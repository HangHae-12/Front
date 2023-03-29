import axios from "axios";
import instance from "./instance";

export const SignAPI = {
  kakaoAuth: async (code, cancelToken) => {
    try {
      const response = await axios.get(
        `https://my-frist-server.shop/oauth/kakao/callback?code=${code}`,
        // 주소가 확정되면 instance로 수정할 것
        null,
        {
          cancelToken: cancelToken,
        }
      );
      // const data = response.data;
      // return data;
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  signParent: async (info) => {
    try {
      const response = await axios.put(
        "https://my-frist-server.shop/signup/parent/info",
        // 주소가 확정되면 instance로 수정할 것
        info
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  signTeacher: async (info) => {
    try {
      const response = await axios.put(
        "https://my-frist-server.shop/signup/teacher/info",
        // 주소가 확정되면 instance로 수정할 것
        info
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
