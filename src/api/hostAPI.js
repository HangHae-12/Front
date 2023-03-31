import instance from "./instance";

export const HostAPI = {

    getManageClass: async (classroomId) => {

        try {
            const response = await instance.get(`/manager/classroom/${classroomId}`)
            console.log(response);
            return response.data.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageTimeSchedule : async (payload) => {

        try {
            const response = await instance.get(`/manager/classroom/${payload.classId}/schedule`,{
                params: {
                    type: payload.type,
                    dailyEnterTime: payload.time,
                    page: payload.page,
                    },
            });
            return response.data.data;

        }catch (error) {
            console.log(error);
        }
            },
    getManageAbsent : async () => {

        try {
            const response = await instance.get("/manager/schedule/absent")
            console.log(response);
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    
}



