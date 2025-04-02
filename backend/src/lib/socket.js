import express from "express";
import http from "http";
import {Server} from "socket.io"


const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

const onlineUsers = {};

export const getOnlineUserSocketId = ( userId ) => onlineUsers[userId]; 

io.on("connection",(socket)=>{
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) onlineUsers[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("joinGroups",({groupIds}) => {
        console.log(groupIds);
        if (!groupIds || groupIds.length === 0) return;
        groupIds.forEach((groupId) => {
            socket.join(groupId._id);
            console.log(`User ${userId} joined group ${groupId._id}`);
        });
    });

    socket.on("leaveGroup",({groupId})=>{
        socket.leave(groupId);
        console.log(`User ${userId} left group ${groupId}`);    
    });

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    })
});

export {io,app,server}