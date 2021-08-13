import mongoose from "mongoose";
import { ITask } from "../interfaces";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  assignedToId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

export const updateTask = (query: object, update: object) => {
  return Task.findOneAndUpdate(query, update, {
    new: true,
    useFindAndModify: false,
  }).exec();
};

export const deleteTasksByGroup = (groupId: mongoose.Types.ObjectId) => {
  return Task.deleteMany({ groupId }).exec();
};

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
