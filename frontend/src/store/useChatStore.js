import {create} from "zustand";
import axiosInstance from "../lib/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set,get)=>({
    //1 to 1 Chats
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
    },


    // Groups
    groupMessages:[],
    isCreateGroupActive:false,
    allGroups:[],
    selectedGroup:null,
    isGroupActive:false,
    isAllGroupFatching:false,
    setIsAllGroupFatching:(data)=>{
        set({isAllGroupFatching:data});
    },
    setGroupMessages:(data)=>{
        set({groupMessages:data});
    },
    setSelectedGroup:(data)=>{ set({selectedGroup:data})},
    setAllGroups:(data)=>{
        set({allGroups:data});
    },
    setIsCreateGroupActive: (value) => {
        set({isCreateGroupActive:value});
    },
    createGroup: async(data)=>{
        try{
            const response = await axiosInstance.post("/create-group",data);
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    getAllGroups:async(data)=>{
        try{
            get().setIsAllGroupFatching(true);
            const response = await axiosInstance.get("/get-groups/"+data);
            get().setAllGroups(response.data.data);
            get().setIsAllGroupFatching(false);
            return response.data;
        }catch(error){
            get().setIsAllGroupFatching(false);
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    setIsGroupActive:(value)=>{
        set({isGroupActive:value});
    },
    sendMessageToGroup:async (data)=>{
        try{
            const {groupMessages} = get();
            const response = await axiosInstance.post("/group-message",data);
            set({groupMessages:[...groupMessages,response.data.data]})
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    getGroupMessages: async (data) => {
        try{
            const response = await axiosInstance.get("/get-group-messages/"+data);
            set({groupMessages: response.data.data.messages});
            return response.data;
        }catch(error){
            return error.response.data? error.response.data : {
                status:"failed",
                message:error.message,
            };
        }
    },
    subscribeToGroupMessage:() => {
        const {selectedGroup} = get();
        if(!selectedGroup) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newGroupMessage", (newMessage)=>{
            const isMessageSendFromSelectedGroup = newMessage.group === selectedGroup._id;
            if(!isMessageSendFromSelectedGroup) return; 
            set({groupMessages:[...get().groupMessages,newMessage]});
        });
    },
    unsubscribeToGroupMessage:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newGroupMessage");
    },

}));

export default useChatStore;