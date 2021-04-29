import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  _id: any;
  name: string;
  email: string;
  password?: string;
}

export interface IGroup extends Document {
  _id: any;
  title: string;
  inviteToken: string;
  creatorId: any;
  memberIds: any[];
}

export interface IMessage extends Document {
  _id: any;
  content: string;
  timestamp: Date;
  userId: any;
  groupId: any;
  readIds: [any];
}

export interface IRequestWithUser extends Request {
  decoded: IUser;
}
