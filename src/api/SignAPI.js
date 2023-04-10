import instance from "./instance";

export const SignAPI = {
  kakaoAuth: async (code, cancelToken) => {
    try {
      const response = await instance.get(
        `/oauth/kakao/callback?code=${code}`,
        null,
        {
          cancelToken: cancelToken,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  signup: async (payload) => {
    const { role, info } = payload;
    console.log(payload);
    try {
      const response = await instance.put(`/${role}/info`, info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
