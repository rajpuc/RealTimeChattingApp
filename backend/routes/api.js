import express from "express";
const router = express.Router();
import {registration,login, uploadDataToCloud, getAllUsers} from "../src/controllers/authController.js";
import formValidator from "../src/middlewares/formValidator.js";
import { isLoggedIn } from "../src/middlewares/authMiddleware.js";
import { createChatRoom, createMessageForChat, retrievedMessages } from "../src/controllers/chatController.js";
import { createGroupRoom, createMessageForGroup } from "../src/controllers/groupController.js";

router.post("/register",formValidator,registration);
router.post("/login",login);
router.post("/upload-file",uploadDataToCloud);

// Authenticated routes
router.get("/get-users",isLoggedIn,getAllUsers);
router.post("/create-chat",isLoggedIn,createChatRoom);
router.post("/chat-message",isLoggedIn,createMessageForChat);
router.post("/create-group",isLoggedIn,createGroupRoom);
router.post("/group-message",isLoggedIn,createMessageForGroup);
router.get("/get-messages/:chatId",isLoggedIn,retrievedMessages);


export default router;