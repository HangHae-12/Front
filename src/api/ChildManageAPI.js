import instance from "./instance";

const ChildManageAPI = {
  getChildProfile: (childId) => instance.get(`/parent/child/${childId}`),
  putChildProfile: ({ childId, data }) =>
    instance.put(`/parent/child/${childId}`, data),
  getChildSchedule: (childId) =>
    instance.get(`/parent/child/${childId}/schedule`),
  putChildSchedule: ({ childId, data }) =>
    instance.put(`/parent/child/${childId}/schedule`, data),
  getChildAttendance: ({ childId, date }) =>
    instance
      .get(
        `/parent/child/${childId}/attendance/month?year=${date.year}&month=${date.month}`
      )
      .then((res) => res.data.data),
  deleteChildAttendance: ({ childId, absentId }) =>
    instance.delete(`parent/child/${childId}/absent/${absentId}`),
  requestChildAttendance: ({ childId, payload }) =>
    instance.post(`parent/child/${childId}/absent`, payload),
};

export default ChildManageAPI;
