import { getOnlineUserSocketId, io } from "../lib/socket.js";
import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

export const createChatRoom = async (req, res) => {
    try {
        const userId = req.user._id;
        const { users } = req.body;

        // Validate Request Body
        if (!users || !Array.isArray(users)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid request.",
                error: "'users' must be an array."
            });
        }

        // Ensure Only 2 Users in Chat
        if (users.length !== 2) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid request",
                error: "A chat can only have two users."
            });
        }

        // Prevent User from Creating Chat with Themselves
        if (users.includes(userId)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid request" ,
                error:"You cannot create a chat with yourself."
            });
        }

        // Check if Chat Already Exists
        const existingChat = await chatModel.findOne({
            users: { $all: users },
        });

        // if (existingChat) {
        //     return res.status(400).json({
        //         status: "failed",
        //         message: "Chat already exists between these users",
        //         error:"Invalid request"
        //     });
        // }
        if (existingChat) {
            return res.status(201).json({
                status: "success",
                message: "Chat room created retrived.",
                data: existingChat,
            });
        }

        // Create New Chat
        const createdChat = await chatModel.create({
            users,
        });

        return res.status(201).json({
            status: "success",
            message: "Chat room created successfully.",
            data: createdChat,
        });
    } catch (error) {
        console.log("Error in createChatRoom Controller : ", error.message);
        res.status(500).json({
            status: "failed",
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export const createMessageForChat = async (req, res) => {
    try {
        const { sender, context, files, chat } = req.body;
        console.log("----------------------------------------------\n"+"Sender:"+sender+"\nReq user:"+req.user._id.toString());
        // Validate Sender (Must Be the Authenticated User)
        if (sender !== req.user._id.toString()) {
            console.log("Sender:"+sender+"\nReq user:"+req.user._id.toString());
            return res.status(403).json({
                status: "failed",
                message: "Unauthorized request.",
                error: "Sender must be the authenticated user.",
            });
        }

        // Validate Chat ID
        if (!chat) {
            return res.status(400).json({
                status: "failed",
                message: "Chat ID is required.",
                error: "Missing chat ID.",
            });
        }

        // Check If Chat Exists
        const isExistChat = await chatModel.findById(chat);
        if (!isExistChat) {
            return res.status(404).json({
                status: "failed",
                message: "Chat not found.",
                error: "Invalid chat ID.",
            });
        }

        // Create New Message
        const createdMessage = await messageModel.create({
            sender,
            context,
            files,
            chat,
        });

        // Add Message to Chat
        isExistChat.messages.push(createdMessage._id);
        isExistChat.latestMessage = createdMessage._id; 
        await isExistChat.save();

  
        const reciever = isExistChat.users.filter((item) => item.toString() !== sender);
        
        const socketId = getOnlineUserSocketId(reciever[0].toString());
        
        if(socketId){
            io.to(socketId).emit("newMessage",createdMessage);
        }

        return res.status(201).json({
            status: "success",
            message: "Message sent successfully.",
            data: createdMessage,
        });

    } catch (error) {
        console.log("Error in createMessageForChat Controller : ", error.message);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export const retrievedMessages = async (req, res) => {
    try {
        // Get chatId from request parameters or body
        const { chatId } = req.params; // Preferably use params
        if (!chatId) {
            return res.status(400).json({
                status: "failed",
                message: "Chat ID is required.",
                error: "Missing chatId in request.",
            });
        }

        // Check if chat exists
        const chat = await chatModel.findById(chatId).populate("messages"); 
        if (!chat) {
            return res.status(404).json({
                status: "failed",
                message: "Chat not found.",
                error: "Invalid chat ID.",
            });
        }

        // Return messages
        return res.status(200).json({
            status: "success",
            message: "Messages retrieved successfully.",
            data: chat,
        });

    } catch (error) {
        console.error("Error in retrievedMessages Controller:", error.message);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error.",
            error: error.message,
        });
    }
};

