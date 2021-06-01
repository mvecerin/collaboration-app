import mongoose from "mongoose";
import { IMessage } from "../interfaces";

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  // readIds: {
  //   type: [mongoose.Types.ObjectId],
  //   required: false,
  // },
});

export const deleteMessagesByGroup = (groupId: mongoose.Types.ObjectId) => {
  return Message.deleteMany({ groupId }).exec();
};

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
