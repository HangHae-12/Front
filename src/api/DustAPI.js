import instance from "./instance";

export const DustAPI = {
  getDustInfo: (payload) => instance.get(`/api`),
};
