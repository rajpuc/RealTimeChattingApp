import {create} from "zustand";
import axiosInstance from "../lib/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set,get)=>({
    isChatActive:false,
    selectedUser:null,
    allusers:[],
    isAlluserFatching:false,
    messages:[],
    setIsChatActive:(value)=>{
        set({isChatActive:value});
    },
    setSelectedUser: (user) => {
        return set({selectedUser:user});
    },
    getAllusers: async ()=>{
        try{
            set({isAlluserFatching:true});
            const response = await axiosInstance.get("/get-users");
            set({isAlluserFatching:false});
            return response.data;
        }catch(error){
            set({ isAlluserFatching: false });
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    setAllUsers:(data)=>{
        set({allusers:data});
    },
    getChatId:async (data) => {
        try{
            const response = await axiosInstance.post("/create-chat",data);
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    getMessages: async (data) => {
        try{
            const response = await axiosInstance.get("/get-messages/"+data);
            set({messages: response.data.data.messages});
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    sendMessageToChat: async(data) => {
        try{
            const {messages} = get();
            const response = await axiosInstance.post("/chat-message",data);
            set({messages:[...messages,response.data.data]})
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    subscribeToMessages:() => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage)=>{
            const isMessageSendFromSelectedUser = newMessage.sender === selectedUser._id;
            if(!isMessageSendFromSelectedUser) return; 
            set({messages:[...get().messages,newMessage]});
        });
    },
    unsubscribeToMessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }

}));

export default useChatStore;