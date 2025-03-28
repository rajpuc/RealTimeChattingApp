import groupModel from "../models/groupModel.js"; // Group model
import userModel from "../models/userModel.js"; // User model (to verify users)


export const createGroupRoom = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated user
    const { name, description, profileImage, admin, users } = req.body; 

    // 🛑 Ensure the admin is the logged-in user
    if (admin !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized access.",
        error: "You can only create a group as the admin.",
      });
    }

    // Validate Request Body
    if (!name || !admin || !users) {
      return res.status(400).json({
        status: "failed",
        message:"Missing required fields." ,
        error: "Group name, admin, and users are required.",
      });
    }

    // Check if the admin is in the users array
    if (!users.includes(admin)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid admin-user relationship.",
        error: "Admin must be part of the users list.",
      });
    }

    // Check if the users array has at least two members
    if (users.length < 3) {
      return res.status(400).json({
        status: "failed",
        message: "A group must have at least three members.",
        error: "Insufficient number of users.",
      });
    }

    // Check if users exist in the database
    const userExist = await userModel.find({ _id: { $in: users } });
    if (userExist.length !== users.length) {
      return res.status(400).json({
        status: "failed",
        message: "One or more users do not exist.",
        error: "Invalid user IDs.",
      });
    }

    // Create the new group
    const newGroup = await groupModel.create({
      name,
      description,
      profileImage: profileImage || null, 
      admin,
      users,
    });

    //  Respond with success
    return res.status(201).json({
      status: "success",
      message: "Group created successfully.",
      data: newGroup,
    });
  } catch (error) {
    console.log("Error in createGroupRoom Controller : ", error.message);
    //  Catch any unexpected errors
    return res.status(500).json({
      status: "failed",
      message: "Internal server error.",
      error: error.message,
    });
  }
};


export const createMessageForGroup = async (req, res) => {
    try {
        const { sender, context, files, group } = req.body;

        // Validate Sender (Must Be the Authenticated User)
        if (sender !== req.user._id.toString()) {
            return res.status(403).json({
                status: "failed",
                message: "Unauthorized request.",
                error: "Sender must be the authenticated user.",
            });
        }

        // Validate Chat ID
        if (!group) {
            return res.status(400).json({
                status: "failed",
                message: "Group ID is required.",
                error: "Missing Group ID.",
            });
        }

        // Check If Chat Exists
        const isExistGroup = await groupModel.findById(group);
        if (!isExistGroup) {
            return res.status(404).json({
                status: "failed",
                message: "Group not found.",
                error: "Invalid group ID.",
            });
        }

        // Create New Message
        const createdMessage = await messageModel.create({
            sender,
            context,
            files,
            group,
        });

        // Add Message to Chat
        isExistGroup.messages.push(createdMessage._id);
        isExistGroup.latestMessage = createdMessage._id; 
        await isExistGroup.save();

        return res.status(201).json({
            status: "success",
            message: "Message sent successfully.",
            data: createdMessage,
        });

    } catch (error) {
        console.log("Error in createMessageForGroup Controller : ", error.message);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error.",
            error: error.message,
        });
    }
};