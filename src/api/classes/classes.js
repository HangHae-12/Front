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
      const response = await instance.get(`api/common/classes/${id}/children`)
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const setClassesTeacher = async (payload) => {
    try {
      const response = await instance.put(`api/managers/${payload.id}/teacher-profiles`,
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
