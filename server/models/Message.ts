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
    required: true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  unreadsIds: {
    type: [mongoose.Types.ObjectId],
    required: false,
  },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
