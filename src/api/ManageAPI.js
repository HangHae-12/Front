import instance from "./instance";

export const ManageAPI = {
  getMemberManage: (payload) =>
    instance.get(
      `/kindergarten/${payload.kindergartenId}/user_role/${payload.userRole}`,
      {
        params: {
          page: payload.page,
          size: payload.size,
        },
      }
    ),

  updateApprove: (userId) => instance.put(`user/${userId}/authenticate`),

  updateReject: (userId) => instance.delete(`user/${userId}/authenticate`),
};
