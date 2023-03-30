import axios from "axios";
import instance from "./instance";
import tokenCookie from "../utils/tokenCookie"; // tokenCookie를 가져온다고 가정합니다.

const apiInstance = axios.create({
  baseURL: "https://my-frist-server.shop",
});

apiInstance.interceptors.request.use((config) => {
  const token = tokenCookie.get();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const SignAPI = {
  kakaoAuth: async (code, cancelToken) => {
    try {
      const response = await apiInstance.get(
        `/oauth/kakao/callback?code=${code}`,
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
  //  sign api 하나로 합칠 수 있을 것 같다.
  signParent: async (info) => {
    try {
      const response = await apiInstance.put("/signup/parent/info", info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  signTeacher: async (info) => {
    console.log(info);
    try {
      const response = await apiInstance.put("/signup/teacher/info", info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
