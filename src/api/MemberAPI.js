import instance from "./instance";

export const MemberAPI = {
  getClassesPage: (id) => instance.get(`classroom/${id}`),

  getClassesMember: (id, currentPage) =>
    instance.get(`classroom/${id}/children?page=${currentPage}`),

  getClassesGallery: (id, currentPage) =>
    instance.get(`classroom/${id}/gallery?page=${currentPage}`),

  getSearchGallery: (searchGallery, id, currentPage) =>
    instance.get(
      `classroom/${id}/gallery?keyword=${searchGallery}&page=${currentPage}`
    ),

  getSearchDateGallery: (id, startDate, endDate, currentPage) =>
    instance.get(
      `classroom/${id}/gallery?start=${startDate}&end=${endDate}&page=${currentPage}`
    ),

  getDetailGallery: (payload) =>
    instance.get(`classroom/${payload.id}/gallery/${payload.imageId}`),

  getSearchMember: (id, searchMember) =>
    instance.get(`classroom/${id}/children/search?name=${searchMember}`),

  getDetailMember: (payload) =>
    instance.get(`classroom/${payload.id}/child/${payload.childid}`),

  getSearchParent: (searchParent) =>
    instance.get(`search/parent?name=${searchParent}`),

  getTeacherInformation: () => instance.get("/teacher"),

  setGallerySubmit: (payload) =>
    instance.post(`/classroom/${payload.id}/gallery`, payload.formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  setGalleryModify: (payload) =>
    instance.put(
      `/classroom/${payload.id}/gallery/${payload.imageId}`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  setMemberSubmit: (payload) =>
    instance.post(`/classroom/${payload.id}/child`, payload.formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  setTeacher: (payload) =>
    instance.put(
      `/classroom/${payload.id}/classroom_teacher/${payload.teacherId}`
    ),

  setChildModify: (payload) =>
    instance.put(
      `/classroom/${payload.id}/child/${payload.childId}`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  removeGallery: (payload) =>
    instance.delete(`/classroom/${payload.id}/gallery/${payload.imageId}`),
};
