import instance from "./instance";

const ChildManageAPI = {
  getChildProfile: (childId) => instance.get(`/parent/child/${childId}`),
  putChildProfule: ({ childId, data }) =>
    instance.put(`/parent/child/${childId}`, data),
  getChildSchedule: (childId) =>
    instance.get(`/parent/child/${childId}/schedule`),
  putChildSchedule: ({ childId, data }) => {
    console.log(childId, data);
    instance.put(`/parent/child/${childId}/schedule`, data);
  },
};

export default ChildManageAPI;
