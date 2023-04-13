import instance from "./instance";

const ChildManageAPI = {
  getChildProfile: () => instance.get(`/parent/child`),
  putChildProfule: ({ childId, data }) =>
    instance.put(`/parent/child/${childId}`, data),
};

export default ChildManageAPI;
