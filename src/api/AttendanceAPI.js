import instance from "./instance";

export const AttendanceAPI = {
  getMonthAttendance: (payload) =>
    instance.get(`classroom/${payload.classroomId}/attendance/month`, {
      params: {
        year: payload.year,
        month: payload.month,
      },
    }),

  getDayAttendance: (payload) =>
    instance.get(`classroom/${payload.classroomId}/attendance/day`, {
      params: {
        date: payload.date,
      },
    }),
};
