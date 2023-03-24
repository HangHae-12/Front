import instance from "./instance";

export const HostAPI = {
    getManage: async () => {

        try {
            const response = await instance.get("/api/managers/");
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageclassroom : async (classroomId) => {

        try {
            const response = await instance.get(`/api/managers/${classroomId}`);
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageSchedule : async (payload) => {

        try {
            const response = await instance.get(`/api/managers/schedule/${payload.categoryId}`,{
                params: { time: payload.time },
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        }
        
}



