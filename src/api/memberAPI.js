import instance from "./instance";

export const MemberAPI = {
  getClassesPage: async (id) => {
    try {
      const response = await instance.get(`api/common/classes/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getClassesMember: async (id) => {
    try {
      const response = await instance.get(`api/common/classes/${id}/children`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // getClassesGallery: async (id, page, perPage) => {
  //   try {
  //     const response = await instance.get(`api/classes/${id}/gallery`, {
  //       params: {
  //         page,
  //         perPage,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  getClassesGallery: async (id) => {
    try {
      const response = await instance.get(
        `api/common/classes/${id}/image-posts`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchGallery: async (searchGallery, id) => {
    try {
      const response = await instance.get(`api/common/classes/${id}/image-posts`, {
        params: {
          keyword: searchGallery
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchDateGallery: async (id, startDate, endDate) => {
    try {
      const response = await instance.get(
        `api/common/classes/${id}/image-posts`,
        {
          params: {
            start: startDate,
            end: endDate,
            page: 1,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setClassesTeacher: async (payload) => {
    try {
      const response = await instance.put(
        `api/managers/classes/${payload.id}/teacher-profiles`,
        payload.formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
