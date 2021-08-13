const ObjectId = require("mongoose").Types.ObjectId;
import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces";
import Task, { updateTask } from "../models/Task";
import { emitTask, emitTaskDelete, emitTaskEdit } from "../utils/socket";

module.exports.getTasks = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = ObjectId(req.params.groupId);
    const query = { groupId };
    const data = await Task.find(query).populate("assignedToId", "name");
    if (!data) {
      throw new Error("Fetching failed");
    }
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.addTask = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const posted = new Task({ ...req.body });
    posted.creatorId = userId;
    const data = await (await posted.save())
      .populate("assignedToId", "name")
      .execPopulate();
    if (!data) {
      throw new Error("Saving failed");
    }
    emitTask(userId.toString(), data.groupId.toString(), data);
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.editTask = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    const query = { _id };
    let update;
    if (req.body.assignedToId) {
      update = { assignedToId: userId };
    } else {
      update = { ...req.body };
    }
    const result = await (await updateTask(query, update))
      ?.populate("assignedToId", "name")
      .execPopulate();
    if (!result) {
      throw new Error("Update failed");
    }
    emitTaskEdit(userId.toString(), result.groupId.toString(), result);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteTask = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.params.id);
    const query = { _id: _id, creatorId: userId };
    const result = await Task.findOneAndDelete(query);
    if (!result) {
      throw new Error("Delete failed");
    }
    emitTaskDelete(userId.toString(), result.groupId.toString(), result.id);
    res.json({ success: true, data: result._id });
  } catch (e) {
    next(e);
  }
};
