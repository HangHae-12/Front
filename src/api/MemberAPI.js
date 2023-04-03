import instance from "./instance";

export const MemberAPI = {
  getClassesPage: async (id) => {
    try {
      const response = await instance.get(`classroom/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getClassesMember: async (id) => {
    try {
      const response = await instance.get(`classroom/${id}/children`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getClassesGallery: async (id) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchGallery: async (searchGallery, id) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`, {
        params: {
          keyword: searchGallery,
          page: 1,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchDateGallery: async (id, startDate, endDate) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`, {
        params: {
          start: startDate,
          end: endDate,
          page: 1,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // getSearchGallery: async (searchGallery, id, currentPage, itemsPerPage) => {
  //   try {
  //     const response = await instance.get(`classroom/${id}/gallery/search`, {
  //       params: {
  //         keyword: searchGallery,
  //         page: currentPage,
  //         per_page: itemsPerPage,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  // getSearchDateGallery: async (id, startDate, endDate, currentPage, itemsPerPage) => {
  //   try {
  //     const response = await instance.get(`classroom/${id}/gallery`, {
  //       params: {
  //         start: startDate,
  //         end: endDate,
  //         page: currentPage,
  //         per_page: itemsPerPage,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  getDetailGallery: async (id, imagePostId) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery/${imagePostId}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setClassesTeacher: async (payload) => {
    try {
      const response = await instance.put(
        `/manager/classroom/${payload.id}/teacher/profile`,
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
  setGallerySubmit: async (payload) => {
    try {
      const response = await instance.post(
        `/classroom/${payload.id}/gallery`,
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