import mongoose from "mongoose";
import { IGroup } from "../interfaces";

// const MemberSchema = new mongoose.Schema({
//   memberId: {
//     type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
//     required: false,
//   },
//   unreads: {
//     type: Number,
//     default: 0,
//   },
// });

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
    required: false,
  },
  // members: {
  //   type: [MemberSchema],
  //   required: false,
  // },
});

export const updateGroup = (query: Object, update: Object) => {
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
