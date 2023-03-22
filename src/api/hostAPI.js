import instance from "./instance";


export const getManageAPI = async (classroomId) => {

    try {
        const response = await instance.get(`/api/managers/${classroomId}`);
        return response.data;

    }catch (error) {
        console.log(error);
    }
    };

export const getManageScheduleAPI = async (payload) => {

    try {
        const response = await instance.get(`/api/managers/schedule/${payload.categoryId}`,{
            params: { time: payload.time },
        });
        return response.data;

    }catch (error) {
        console.log(error);
    }
    };
    
export const getManageAbsentAPI = async () => {

    try {
        const response = await instance.get(`/api/managers/absent`);
        return response.data;

    }catch (error) {
        console.log(error);
    }
    };

