import instance from "./instance";
import qs from 'qs';

export const HostAPI = {
    getManageSchedule: async (payload) => {

        try {
            const response = await instance.get("/manager/schedule",{
                params: payload,
                
            });
            console.log(response);
            return response.data;
    
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
    getManageClassSchedule : async (payload) => {

        try {
            const response = await instance.get(`/manager/classroom/${payload.classId}/schedule`,{
                params: {
                    type: payload.type,
                    time: payload.time,
                    page: payload.page,
                  },
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
            },
}



