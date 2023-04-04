import instance from "./instance";

export const HostAPI = {
  //page,size는 param 나머지 jsom 형태로 전달
  getManageSchedule: async (payload) => {
    try {
      const data = {
        classroomId: payload.classroomId,
        state: payload.state,
        time: payload.time,
      };
      const response = await instance.get(`/manager/classroom`, {
        params: {
          ...payload,
          data: JSON.stringify(data),
        },
      });
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
