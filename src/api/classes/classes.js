import instance from "../instance";


export const getClassesPage = async (id) => {
    try {
      const response = await instance.get(`/common/classes/${id}`);
      return response;
    } catch (error) {}
  };