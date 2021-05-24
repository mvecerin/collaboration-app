import { IUser } from "../interfaces";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
