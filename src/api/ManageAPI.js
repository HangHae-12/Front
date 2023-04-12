import instance from "./instance";

export const ManageAPI = {
  getMemberManage: async (payload) => {
    try {
      const response = await instance.get(
        `/kindergarten/${payload.kindergartenId}/user_role/${payload.userRole}`,
        {
          params: {
            page: payload.page,
            size: payload.size,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateApprove: async (userId) => {
    try {
      const response = await instance.put(`user/${userId}/authenticate`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateReject: async (userId) => {
    try {
      const response = await instance.delete(`user/${userId}/authenticate`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
