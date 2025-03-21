import express from "express";
const router = express.Router();
import {registration,login, uploadDataToCloud} from "../src/controllers/authController.js";
import formValidator from "../src/middlewares/formValidator.js";

router.post("/register",formValidator,registration);
router.post("/login",login);
router.post("/upload-file",uploadDataToCloud);

export default router;