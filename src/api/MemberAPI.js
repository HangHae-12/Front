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
  getClassesMember: async (id, currentPage) => {
    try {
      const response = await instance.get(`classroom/${id}/children`, {
        params: {
          page: currentPage,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getClassesGallery: async (id, currentPage) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`, {
        params: {
          page: currentPage,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchGallery: async (searchGallery, id, currentPage) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`, {
        params: {
          keyword: searchGallery,
          page: currentPage,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSearchDateGallery: async (id, startDate, endDate, currentPage) => {
    try {
      const response = await instance.get(`classroom/${id}/gallery`, {
        params: {
          start: startDate,
          end: endDate,
          page: currentPage,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getDetailGallery: async (payload) => {
    try {
      const response = await instance.get(
        `classroom/${payload.id}/gallery/${payload.imageId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getSearchMember: async (id, searchMember) => {
    try {
      const response = await instance.get(`classroom/${id}/children/search`, {
        params: {
          name: searchMember,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getDetailMember: async (payload) => {
    try {
      const response = await instance.get(
        `classroom/${payload.id}/child/${payload.childid}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getSearchParent: async (searchParent) => {
    try {
      const response = await instance.get("search/parent", {
        params: {
          name: searchParent,
        },
      });
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

  setGalleryModify: async (payload) => {
    try {
      const response = await instance.put(
        `/classroom/${payload.id}/gallery/${payload.imageId}`,
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

  setMemberSubmit: async (payload) => {
    try {
      const response = await instance.post(
        `/classroom/${payload.id}/child`,
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

  removeGallery: async (payload) => {
    try {
      const response = await instance.delete(
        `/classroom/${payload.id}/gallery/${payload.imageId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
