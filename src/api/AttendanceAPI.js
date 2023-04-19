import instance from "./instance";

export const AttendanceAPI = {
  getMonthAttendance: (payload) =>
    instance.get(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.classroomId}/attendance/month`,
      {
        params: {
          year: payload.year,
          month: payload.month,
        },
      }
    ),

  getDayAttendance: (payload) =>
    instance.get(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.classroomId}/attendance/day`,
      {
        params: {
          date: payload.date,
        },
      }
    ),
};
