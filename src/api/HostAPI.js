import instance from "./instance";

export const HostAPI = {
  getManageSchedule: async (payload) => {
    try {
      const response = await instance.get(
        `/manager/classroom/${payload.classroomId}`,
        {
          params: {
            page: payload.page,
            size: payload.size,
            state: payload.state,
            time: payload.time,
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
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateEnter: async (payload) => {
    try {
      const response = await instance.put(`manager/child/${payload.id}/enter`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateExit: async (payload) => {
    try {
      const response = await instance.put(`manager/child/${payload.id}/exit`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
