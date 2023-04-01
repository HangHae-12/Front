import instance from "./instance";

export const HostAPI = {
  getManageClass: async (classroomId) => {
    try {
      const response = await instance.get(`/manager/classroom/${classroomId}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getManageTimeSchedule: async (payload) => {
    try {
      const response = await instance.get(
        `/manager/classroom/${payload.classroomId}/schedule`,
        {
          params: {
            type: payload.type,
            dailyEnterTime: payload.dailyEnterTime,
            page: payload.page,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getManageAbsent: async () => {
    try {
      const response = await instance.get("/manager/schedule/absent");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateEnter: async (childId) => {
    try {
      const response = await instance.put(`manager/child/${childId}/enter`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateExit: async (childId) => {
    try {
      const response = await instance.put(`manager/child/${childId}/exit`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
