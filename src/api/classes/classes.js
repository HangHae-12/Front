import api from "../axios";


export const getClassesPage = async (id) => {
    try {
      const response = await api.get(`/common/classes/${id}`);
      return response;
    } catch (error) {}
  };