import instance from "./instance";
import qs from 'qs';

export const HostAPI = {
    getManageEnter: async (payload) => {

        try {
            const response = await instance.get("/manager/schedule/enter",{
                params: qs.stringify(payload),
                
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageExit : async (payload) => {

        try {
            const response = await instance.get("/manager/schedule/exit",{
                params: qs.stringify(payload),
                
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageAbsent : async () => {

        try {
            const response = await instance.get("/manager/schedule/absent")
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
        },
    getManageScheduleEnter : async (payload) => {

        try {
            const response = await instance.get(`/manager/classroom/${payload.classroomId}/schedule/enter`,{
                params: qs.stringify(payload),
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
            },
    getManageScheduleExit : async (payload) => {

        try {
            const response = await instance.get(`/manager/classroom/${payload.classroomId}/schedule/exit`,{
                params: qs.stringify(payload),
            });
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
            },
    getManageScheduleAbsent : async (classroomId) => {

        try {
            const response = await instance.get(`/manager/classroom/${classroomId}/schedule/absent`)
            
            return response.data;
    
        }catch (error) {
            console.log(error);
        }
            },    
}



