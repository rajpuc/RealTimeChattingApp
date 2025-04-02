import userModel from "../models/userModel.js";
import cloudinary from "../utils/cloudinary.js";
import { validationResult } from "express-validator";
import { hashPassword, passComparison } from "../utils/passwordUtility.js";
import { generateToken } from "../utils/tokenUtility.js";
import { JWT_EXPIRE_TIME } from "../config/config.js";

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    // 401 Unauthorized: Used when authentication fails (e.g., incorrect email/password).
    // 400 Bad Request: Used for generic input validation errors.
    // 403 Forbidden: Used when the user is authenticated but lacks permission.
    if(!user){
      return res.status(401).json({
        status:"failed",
        message:"Invalid email or password",
        error:"Invalid email or password"
      })
    }

    const isPasswordValid = await passComparison(password, user.password);

    if(!isPasswordValid){
      return res.status(401).json({
        status:"failed",
        message:"Invalid email or password",
        error:"Invalid email or password"
      })
    }

    //Generate JWT key
    const token = generateToken(user._id, user.email);

    //Send token through cookies
    const tokenOptions = {
      httpOnly: true,// Prevents client-side JavaScript from accessing the cookie. for example:✅ Allowed: Server can access req.cookies.token. ❌ Blocked: console.log(document.cookie); (It won't show token).

      secure:process.env.NODE_ENV === "production", //Ensures the cookie is sent only over HTTPS (not HTTP).

      sameSite:"strict", // Controls when cookies are sent in cross-site requests. Effect:
      // "strict" → Cookie is sent only when the request comes from the same site.
      // "lax" → Cookie is sent for GET requests from external sites (not POST/PUT).
      // "none" → Cookie is sent for all requests (⚠️ requires secure: true).
      maxAge:JWT_EXPIRE_TIME * 1000 //Sets how long the cookie is valid (in milliseconds).
    }
    res.cookie("token", token, tokenOptions)
   

    res.status(200).json({
      status:"success",
      message:"Successfully Login",
      data:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        dateofbirth:user.dateofbirth,
        gender:user.gender,
        profileimage:user.profileimage
      }
    });
  }catch(error){
    console.log("Error in Login Controller : ",error.message);
    res.status(500).json({
      status:"failed",
      message:"Internal server error",
      error:error.message
    })
  }
};
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
    });

    return res.status(201).json({
      status:"success",
      message:"Successfully registered",
      data:{
        _id:createdUser._id,
        fullname:createdUser.fullname,
        email:createdUser.email,
        dateofbirth:createdUser.dateofbirth,
        gender:createdUser.dateofbirth,
        profileimage:createdUser.profileimage
    }});
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
export const getAllUsers = async (req, res) => {
  const userId = req.user?._id; // Ensure userId exists
  if (!userId) {
    return res.status(400).json({
      status: "failed",
      message: "Please login first.",
      error: "User ID is missing in the request",
    });
  }

  try {
    const allUsers = await userModel.find({ _id: { $ne: userId } }).select("-password");

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No users found",
        error: "No users found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.log('Error in getAllUsers Controller: '+error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const checkAuth = async (req, res)=>{
  try{
    res.status(200).json({
      status:"success",
      message:"Successfully retrieved user",
      data:req.user,
    });
  }catch(error){
    console.log('Error in checkAuth Controller: '+error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}
export const logout = (req,res)=>{
  try{
    res.cookie("token","",{maxAge:0});
    res.status(200).json({
      status:"success",
      message:"Successfully logout."
    })
  }catch(error){
    console.log('Error in logout Controller: '+error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id; 
    const { fullname, email, dateofbirth, profileimage } = req.body;

    // Find the user by ID
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Update user details
    user.fullname = fullname || user.fullname;
    user.dateofbirth = dateofbirth || user.dateofbirth;
    user.email = email || user.email;
    user.gender =  user.gender;
    user.profileimage = profileimage || user.profileimage;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        dateofbirth: user.dateofbirth,
        gender: user.gender,
        profileimage: user.profileimage,
      },
    });
  } catch (error) {
    console.log("Error in Profile Update Controller: " + error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
