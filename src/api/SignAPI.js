import axios from "axios";
import instance from "./instance";
import tokenCookie from "../utils/tokenCookie"; // tokenCookie를 가져온다고 가정합니다.

const apiInstance = axios.create({
  baseURL: "https://my-frist-server.shop",
});

apiInstance.interceptors.request.use((config) => {
  const token = tokenCookie.get();
  if (token) {
    config.headers["Authorization"] = `${token}`;
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
  
  putExtraInfo: async (payload) => {
    const { role, info } = payload;
    console.log(payload);
    try {
      const response = await apiInstance.put(`/${role}/info`, info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  
};