const ObjectId = require("mongoose").Types.ObjectId;
const { createToken, verifyToken } = require("../utils/tokenUtil");
import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces";
import Group, { updateGroup } from "../models/Group";
import { deleteMessagesByGroup } from "../models/Message";
import {
  emitDeleteGroup,
  emitEditTitle,
  emitJoinMember,
  emitLeaveMember,
} from "../utils/socket";

module.exports.getGroups = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = ObjectId(req.decoded._id);
    const query = { memberIds: userId };
    const data = await Group.find(query).populate("memberIds", "name").exec();
    // const query = { members: { $elemMatch: { memberId: userId } } };
    // const data = await Group.find(query).populate("memberId", "name").exec();
    if (!data) {
      throw new Error("Fetching failed");
    }
    // const ids = data.map((value) => value._id);
    // connectAllRooms(userId, ids);
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.addGroup = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const posted = new Group({ ...req.body });
    const userId = ObjectId(req.decoded._id);
    posted.creatorId = userId;
    posted.memberIds.push(userId);
    const data = await (await posted.save())
      .populate("memberIds", "name")
      .execPopulate();
    if (!data) {
      throw new Error("Saving failed");
    }
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.addToken = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Generate token
    const _id = ObjectId(req.body._id);
    const inviteToken = createToken({ _id });
    if (!inviteToken) {
      throw new Error("Token error");
    }
    // Save token
    const update = { inviteToken };
    const userId = ObjectId(req.decoded._id);
    const query = { _id: _id, creatorId: userId };
    const result = await updateGroup(query, update);
    if (!result) {
      throw new Error("Update failed");
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.updateTitle = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    //const query = {_id: _id, members: {$elemMatch: {memberId: userId}}};
    const query = { creatorId: userId, _id: _id };
    const update = { title: title };
    const result = await updateGroup(query, update);
    if (!result) {
      throw new Error("Update failed");
    }
    emitEditTitle(userId.toString(), result.title, _id.toString());
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.joinGroup = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { inviteToken } = req.body;
    const userId = ObjectId(req.decoded._id);

    // Decode token to get the group _id
    const decoded = verifyToken(inviteToken);
    if (!decoded) {
      throw new Error("Token error");
    }
    const groupId = ObjectId(decoded._id);

    // const query = {
    //   _id: _id,
    //   members: {
    //     $not: {
    //       $elemMatch: {
    //         memberId: userId,
    //       },
    //     },
    //   },
    // };
    //const update = { $push: { members: { memberId: userId } } };
    const query = { _id: groupId };
    const update = { $addToSet: { memberIds: userId } };
    const result = await updateGroup(query, update);
    if (!result) {
      throw new Error("Update failed");
    }
    emitJoinMember(userId.toString(), result.memberIds, groupId.toString());

    res.json({
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.leaveGroup = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    const query = { _id: _id };
    // const query = {_id: _id, members: {$elemMatch: {memberId: userId, admin: false}}};
    //const update = { $pull: { members: { memberId: userId } } };
    const update = { $pull: { memberIds: userId } };
    const result = await updateGroup(query, update);

    if (!result) {
      throw new Error("Update failed");
    }
    emitLeaveMember(userId.toString(), result.memberIds, _id.toString());
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteGroup = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.params.id);
    const query = { _id: _id, creatorId: userId };
    const result = await Group.findOneAndDelete(query);
    if (!result) {
      throw new Error("Delete failed");
    }
    const deleteMessages = await deleteMessagesByGroup(result._id);
    if (!deleteMessages.ok) {
      throw new Error("Deleting messages failed");
    }
    emitDeleteGroup(userId.toString(), _id.toString());
    res.json({ success: true, data: result._id });
  } catch (e) {
    next(e);
  }
};
