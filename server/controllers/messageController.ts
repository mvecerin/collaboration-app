const ObjectId = require("mongoose").Types.ObjectId;
import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces";
import Message from "../models/Message";
import { emitMessage } from "../utils/socket";
const { addUnreads } = require("../controllers/groupController");

module.exports.getMessages = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let groupId = ObjectId(req.params.groupId);
    const query = { groupId };
    const data = await Message.find(query).populate("userId", "name").exec();
    if (!data) {
      throw new Error("Fetching failed");
    }
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.addMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const posted = new Message({ ...req.body });
    const userId = ObjectId(req.decoded._id);
    posted.userId = userId;
    posted.readIds.push(userId);
    const result = await (await posted.save())
      .populate("userId", "name")
      .execPopulate();
    if (!result) {
      throw new Error("Saving failed");
    }
    emitMessage(userId.toString(), result.groupId.toString(), result);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    const query = { userId, _id };
    const update = { content };

    const result = await Message.findOneAndUpdate(query, update, {
      new: true,
      useFindAndModify: false,
    }).exec();
    if (!result) {
      throw new Error("Update failed");
    }
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.updateSeenMessages = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const groupId = ObjectId(req.body.groupId);
    const query = {
      groupId,
      readIds: { $ne: userId },
    };
    const update = { $addToSet: { readIds: userId } };

    const messages = await Message.find(query, "_id readIds").exec();
    const result = await Message.updateMany(query, update).exec();

    if (!result) throw new Error("Update failed");
    res.json({
      success: true,
      data: messages,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteMessage = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.params.id);
    const query = { _id, userId };
    const result = await Message.findOneAndDelete(query);

    if (!result) throw new Error("Delete failed");
    res.json({ success: true, data: result._id });
  } catch (e) {
    next(e);
  }
};
