import instance from "./instance";

const ChildManageAPI = {
  getChildProfile: (childId) => instance.get(`/parent/child/${childId}`),
  putChildProfule: ({ childId, data }) =>
    instance.put(`/parent/child/${childId}`, data),
};

export default ChildManageAPI;
