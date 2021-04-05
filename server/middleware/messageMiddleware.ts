const Group = require("../models/Group");

module.exports = async (req: any, res: any, next: any) => {
  const { groupId } = req.body;
  const members = await Group.getGroupMembers(groupId);
  req.members = members;
  next();
};
