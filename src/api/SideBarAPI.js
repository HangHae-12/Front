import instance from "./instance";

export const SideBarAPI = {
  getSideBar: async () => {
    try {
      const response = await instance.get("user/profile");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
