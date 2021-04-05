import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IGroup extends Document {
  title: string;
  inviteToken: string;
  creatorId: any;
  members: any[];
}

export interface IMessage extends Document {
  content: string;
  timestamp: Date;
  userId: any;
  groupId: any;
  unreadsIds: [any];
}
