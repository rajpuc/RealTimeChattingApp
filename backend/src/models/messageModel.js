import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    context: {
      type: String,
      trim: true,
    },
    files: [
      {
        type: String,
      },
    ],
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
