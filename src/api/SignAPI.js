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
      const response = await instance.put(`/${role}/info`, info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};
