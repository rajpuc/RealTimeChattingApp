import {create} from "zustand";
import axiosInstance from "../lib/axios";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5050" : "/";
const useAuthStore = create((set,get)=>({
    isUploadFile:false,
    isSigningUp:false,
    isSigningIn:false,
    loggedInUser:null,
    onlineUsers:[],
    socket:null,
    uploadFile: async (data) => {
      set({isUploadFile:true});
      let result;
      try{
        const uploadResponse = await axiosInstance.post("/upload-file",data);
        result= {
          status:"success",
          message:uploadResponse.data.message,
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
    },
    signin: async (data) =>{
      set({isSigningIn:true})
      let result;
      try{
        const response = await axiosInstance.post("/login",data);
        set({loggedInUser:response.data.data});
        get().connectSocket();
        result = {
          status: response.data.status,
          message: response.data.message,
          data: response.data.data
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
      set({isSigningIn:false})
      return result;
    },
    connectSocket: () => {
      const {loggedInUser} = get();
      if(!loggedInUser || get().socket?.connected) return;
      const socket = io(BASE_URL, {
        query: {
          userId: loggedInUser._id,
        }
      });
      socket.connect();

      socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds});
      });

      set({socket:socket});
    }
}));

export default useAuthStore;