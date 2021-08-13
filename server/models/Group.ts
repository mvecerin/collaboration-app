import mongoose from "mongoose";
import { IGroup } from "../interfaces";

const GroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  inviteToken: {
    type: String,
    required: false,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  memberIds: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    required: true,
  },
});

export const updateGroup = (query: object, update: object) => {
  return Group.findOneAndUpdate(query, update, {
    new: true,
    useFindAndModify: false,
  }).exec();
};

export const getGroupMembers = (_id: any) => {
  return Group.findById(_id, "members").exec();
};

const Group = mongoose.model<IGroup>("Group", GroupSchema);

export default Group;
