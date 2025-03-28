import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
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

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
