const ObjectId = require("mongoose").Types.ObjectId;
import Message from "../models/Message";
const { addUnreads } = require("../controllers/groupController");

module.exports.getMessages = async (req: any, res: any, next: any) => {
  try {
    let groupId = ObjectId(req.body._id);
    const query = { groupId };
    const data = await Message.find(query).exec();
    if (!data) {
      throw new Error("Fetching failed");
    }
    res.json({ success: true, data: data });
  } catch (e) {
    next(e);
  }
};

module.exports.addMessage = async (req: any, res: any, next: any) => {
  try {
    const posted = new Message({ ...req.body });
    const userId = ObjectId(req.decoded._id);
    const members = req.members;
    posted.userId = userId;
    // posted.unreadsIds.push(...members);
    const result = await posted.save();
    if (!result) {
      throw new Error("Saving failed");
    }
    const addedUnreads = await addUnreads();
    if (!addedUnreads) throw new Error("Saving unreads failed");
    res.json({ success: true, insertId: result._id });
  } catch (e) {
    next(e);
  }
};

module.exports.updateMessage = async (req: any, res: any, next: any) => {
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
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// module.exports.updateSeenMessages = async (req, res, next) => {
//   try {
//     const userId = ObjectId(req.decoded._id);
//     const groupId = ObjectId(req.body.groupId);
//     const query = { groupId };
//     const update = { $addToSet: { seenByIds: userId } };

//     const result = await Message.updateMany(query, update).exec();

//     if (!result) throw new Error("Update failed");
//     res.json({ success: true, nModified: result.nModified });
//   } catch (e) {
//     next(e);
//   }
// };

module.exports.deleteMessage = async (req: any, res: any, next: any) => {
  try {
    const userId = ObjectId(req.decoded._id);
    const _id = ObjectId(req.params.id);
    const query = { _id, userId };
    const result = await Message.findOneAndDelete(query);

    if (!result) throw new Error("Delete failed");
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
