import {create} from "zustand";
import axiosInstance from "../lib/axios";


const useAuthStore = create((set,get)=>({
    isUploadFile:false,
    isSigningUp:false,
    uploadFile: async (data) => {
      set({isUploadFile:true});
      let result;
      try{
        const uploadResponse = await axiosInstance.post("/upload-file",data);
        result= {
          status:"success",
          data:uploadResponse.data.data
        }
      }catch(error){
        result={
          status:"failed",
          error:error.message,
        }
      }
      set({isUploadFile:false});
      return result;
    },
    signup: async (data) =>{
      set({isSigningUp:true});
      let result;
      try{
        const response = await axiosInstance.post("/register",data);
        result = {
          status:response.data.status,
          message:response.data.message,
          data:response.data.data
        }
      }catch(error){
        if(error.response.data){
          result = {
            status:error.response.data.status,
            message:error.response.data.message,
            error:error.response.data.error,
          }
        }else{
          result = {
            status:"failed",
            message:error.message,
          }
        }

      }
      set({isSigningUp:false});
      return result;
    }
}));

export default useAuthStore;