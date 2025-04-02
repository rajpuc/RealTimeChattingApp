import express from "express";
const router = express.Router();
import {registration,login, uploadDataToCloud, getAllUsers, logout, checkAuth, updateProfile} from "../src/controllers/authController.js";
import formValidator from "../src/middlewares/formValidator.js";
import { isLoggedIn } from "../src/middlewares/authMiddleware.js";
import { createChatRoom, createMessageForChat, retrievedMessages } from "../src/controllers/chatController.js";
import { createGroupRoom, createMessageForGroup, getUserGroups, retrievedGroupMessages } from "../src/controllers/groupController.js";

router.post("/register",formValidator,registration);
router.post("/login",login);
router.post("/upload-file",uploadDataToCloud);

// Authenticated routes
router.get("/get-users",isLoggedIn,getAllUsers);
router.post("/create-chat",isLoggedIn,createChatRoom);
router.post("/chat-message",isLoggedIn,createMessageForChat);
router.post("/create-group",isLoggedIn,createGroupRoom);
router.post("/group-message",isLoggedIn,createMessageForGroup);
router.post("/update-profile",isLoggedIn,updateProfile);
router.get("/get-messages/:chatId",isLoggedIn,retrievedMessages);
router.get("/get-groups/:userId",isLoggedIn,getUserGroups);
router.get("/get-group-messages/:groupId",isLoggedIn,retrievedGroupMessages);
router.get("/check-auth",isLoggedIn,checkAuth);

router.get("/logout",isLoggedIn,logout);


export default router;