import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const groupModel = mongoose.model("Group", groupSchema);
export default groupModel;
