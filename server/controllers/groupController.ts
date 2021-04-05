const ObjectId = require("mongoose").Types.ObjectId;
const { createToken, verifyToken } = require("../utils/tokenUtil");
import Group, { updateGroup } from "../models/Group";

module.exports.getGroups = async (req: any, res: any, next: any) => {
  try {
    let userId = ObjectId(req.decoded._id);
    // const query = { memberIds: userId };
    // const data = await Group.find(query).populate("memberIds", "name").exec();
    const query = { members: { $elemMatch: { memberId: userId } } };
    const data = await Group.find(query).populate("memberId", "name").exec();
    if (data) {
      res.json({ success: true, data: data });
    } else {
      throw new Error("Fetching failed");
    }
  } catch (e) {
    next(e);
  }
};

module.exports.addGroup = async (req: any, res: any, next: any) => {
  try {
    const posted = new Group({ ...req.body });
    const userId = ObjectId(req.decoded._id);
    posted.creatorId = userId;
    // posted.memberIds.push(userId);
    //const member = {memberId: userId, admin: true};
    //posted.members.push(memberId);
    posted.members.push(userId);
    const result = await posted.save();
    if (result) {
      res.json({ success: true, insertId: result._id });
    } else {
      throw new Error("Saving failed");
    }
  } catch (e) {
    next(e);
  }
};

module.exports.updateTitle = async (req: any, res: any, next: any) => {
  try {
    const { title } = req.body;
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    //const query = {_id: _id, members: {$elemMatch: {memberId: userId}}};
    const query = { creatorId: userId, _id: _id };
    const update = { title: title };
    const result = await updateGroup(query, update);
    if (result) {
      res.json({ success: true });
    } else {
      throw new Error("Update failed");
    }
  } catch (e) {
    next(e);
  }
};

module.exports.addToken = async (req: any, res: any, next: any) => {
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
    res.json({ success: true, inviteToken });
  } catch (e) {
    next(e);
  }
};
module.exports.joinGroup = async (req: any, res: any, next: any) => {
  try {
    const { inviteToken } = req.body;
    const userId = ObjectId(req.decoded._id);

    // Decode token to get the group _id
    const decoded = verifyToken(inviteToken);
    if (!decoded) {
      throw new Error("Token error");
    }
    const _id = ObjectId(decoded._id);

    // Check if user exists in group
    const query = {
      _id: _id,
      members: {
        $not: {
          $elemMatch: {
            memberId: userId,
          },
        },
      },
    };
    //const query = { _id: _id };
    // Update
    const update = { $push: { members: { memberId: userId } } };
    //const update = { $addToSet: { memberIds: userId } };
    const result = await updateGroup(query, update);
    if (!result) {
      throw new Error("Update failed");
    }
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports.leaveGroup = async (req: any, res: any, next: any) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.body._id);
    const query = { _id: _id };
    // const query = {_id: _id, members: {$elemMatch: {memberId: userId, admin: false}}};
    const update = { $pull: { members: { memberId: userId } } };
    // const update = { $pull: { memberIds: userId } };
    const result = await updateGroup(query, update);

    if (!result) {
      throw new Error("Update failed");
    }
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteGroup = async (req: any, res: any, next: any) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.params.id);
    const query = { _id: _id, creatorId: userId };
    const result = await Group.findOneAndDelete(query);
    if (!result) {
      throw new Error("Delete failed");
    }
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
