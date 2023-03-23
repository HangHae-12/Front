import instance from "../instance";

export const getClassesPage = async (id) => {
  try {
    const response = await instance.get(`api/common/classes/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getClassesMember = async (id) => {
  try {
    const response = await instance.get(`api/common/classes/${id}/children`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getClassesGallery = async (id, page, perPage) => {
  try {
    const response = await instance.get(`api/classes/${id}/gallery`, {
      params: {
        page,
        perPage,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchGallery = async (keyword, page, perPage) => {
  try {
    const response = await instance.get("api/common/search/imagePosts", {
      params: {
        keyword,
        page,
        perPage,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchDateGallery = async (payload) => {
  try {
    const response = await instance.get(`api/common/classes/${payload.id}/image-posts`, {
      params: {
        start: payload.start,
        end: payload.end,
        page: payload.page
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setClassesTeacher = async (payload) => {
  try {
    const response = await instance.put(
      `api/managers/${payload.id}/teacher-profiles`,
      {
        image: payload.image,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
