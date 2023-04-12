import instance from "./instance";

export const SideBarAPI = {
  getUserProfile: () => instance.get("user/profile"),
};
