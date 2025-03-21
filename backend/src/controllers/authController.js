import userModel from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/passwordUtility.js";

export const login = async (req, res) => {};
export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const groupedErrors = errors.array().reduce((acc, error) => {
        if (!acc[error.path]) {
          acc[error.path] = [];
        }
        acc[error.path].push(error.msg);
        return acc;
      }, {});

      // Send a 400 Bad Request status with validation errors
      return res.status(400).json({
        status: "failed",
        message: "Serverside Validation Error",
        error: groupedErrors,
      });
    }

    const {fullname,email,password,dateofbirth,gender,profileImage} = req.body;

    //Check the user is already exist or not
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      return res.status(400).json({
        status:"failed",
        message: "Email is already registered",
        error:"Email is already registered"
      })
    }

    //Hashed Password
    const hashedPassword = await hashPassword(password);

    let createdUser = await userModel.create({
      fullname,
      email,
      password:hashedPassword,
      dateofbirth,
      gender,
      profileimage:profileImage
    })

    return res.status(201).json({
      status:"success",
      message:"Successfully registered",
      data:createdUser
    })
  } catch (error) {
    console.log("Error in Registration Controller: " + error.message);

    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error:error.message
    });
  }
};
export const uploadDataToCloud = async (req, res) => {
  try {
    const { file } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(file);
    return res.status(200).json({
      status:"success",
      message:"File uploaded successfully.",
      data: uploadResponse.secure_url 
    });
  } catch (error) {
    console.log('Error in uploadDataToCloud Controller: '+error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
