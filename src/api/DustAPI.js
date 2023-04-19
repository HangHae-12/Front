import instance from "./instance";

export const DustAPI = {
  getDustInfo: () => instance.get(`/air`),
};
