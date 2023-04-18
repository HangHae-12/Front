import instance from "./instance";

export const MemberAPI = {
  getClassesList: (kindergartenId) =>
    instance.get(`kindergarten/${kindergartenId}`),

  getClassesPage: (kindergartenId, id) =>
    instance.get(`kindergarten/${kindergartenId}/classroom/${id}`),

  getClassesMember: (kindergartenId, id, currentPage) =>
    instance.get(
      `kindergarten/${kindergartenId}/classroom/${id}/children?page=${currentPage}`
    ),

  getClassesGallery: (kindergartenId, id, currentPage) =>
    instance.get(
      `kindergarten/${kindergartenId}/classroom/${id}/gallery?page=${currentPage}`
    ),

  getSearchGallery: (kindergartenId, searchGallery, id, currentPage) =>
    instance.get(
      `kindergarten/${kindergartenId}/classroom/${id}/gallery?keyword=${searchGallery}&page=${currentPage}`
    ),

  getSearchDateGallery: (kindergartenId, id, startDate, endDate, currentPage) =>
    instance.get(
      `kindergarten/${kindergartenId}/classroom/${id}/gallery?start=${startDate}&end=${endDate}&page=${currentPage}`
    ),

  getDetailGallery: (payload) =>
    instance.get(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/gallery/${payload.imageId}`
    ),

  getSearchMember: (kindergartenId, id, searchMember) =>
    instance.get(
      `kindergarten/${kindergartenId}/classroom/${id}/children/search?name=${searchMember}`
    ),

  getDetailMember: (payload) =>
    instance.get(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/child/${payload.childid}`
    ),

  getSearchParent: (searchParent) =>
    instance.get(`search/parent?name=${searchParent}`),

  getTeacherInformation: (kindergartenId) =>
    instance.get(`kindergarten/${kindergartenId}/teacher`),

  setGallerySubmit: (payload) =>
    instance.post(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/gallery`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  setGalleryModify: (payload) =>
    instance.put(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/gallery/${payload.imageId}`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  setMemberSubmit: (payload) =>
    instance.post(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/child`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  setTeacher: (payload) =>
    instance.put(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/classroom_teacher/${payload.teacherId}`
    ),

  setChildModify: (payload) =>
    instance.put(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/child/${payload.childId}`,
      payload.formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),

  setClasses: (payload) =>
    instance.post(
      `kindergarten/${payload.kindergartenId}/classroom?name=${payload.name}`
    ),

  setClassesModify: (payload) =>
    instance.put(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}?name=${payload.name}`
    ),

  removeGallery: (payload) =>
    instance.delete(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}/gallery/${payload.imageId}`
    ),

  removeClasses: (payload) =>
    instance.delete(
      `kindergarten/${payload.kindergartenId}/classroom/${payload.id}`
    ),
};
