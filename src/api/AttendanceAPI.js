import instance from "./instance";

export const AttendanceAPI = {
  getMonthAttendance: async (payload) => {
    try {
      const response = await instance.get(
        `classroom/${payload.classroomId}/attendance/month`,
        {
          params: {
            year: payload.year,
            month: payload.month,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getDayAttendance: async (payload) => {
    try {
      const response = await instance.get(
        `classroom/${payload.classroomId}/attendance/day`,
        {
          params: {
            date: payload.date,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
