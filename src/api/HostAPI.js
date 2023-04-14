import instance from "./instance";

export const HostAPI = {
  getManageSchedule: (payload) =>
    instance.get(`/manager/classroom/${payload.classroomId}`, {
      params: {
        page: payload.page,
        size: payload.size,
        state: payload.state,
        time: payload.time,
      },
    }),

  getManageAbsent: () => instance.get("/manager/schedule/absent"),

  updateEnter: (payload) => instance.put(`manager/child/${payload.id}/enter`),

  updateExit: (payload) => instance.put(`manager/child/${payload.id}/exit`),
};
