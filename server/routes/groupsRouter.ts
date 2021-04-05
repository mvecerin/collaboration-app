const groupsRouter = require("express").Router();
const {
  getGroups,
  addGroup,
  updateTitle,
  joinGroup,
  leaveGroup,
  deleteGroup,
  addToken,
} = require("../controllers/groupController");

// /api/groups
groupsRouter.route("/").get(getGroups).post(addGroup);

// /api/groups/title  update title
groupsRouter.put("/title", updateTitle);

// /api/groups/invite  generate invite token
groupsRouter.put("/invite", addToken);

// /api/groups/join  join group
groupsRouter.put("/join", joinGroup);

// /api/groups/leave  leave group
groupsRouter.put("/leave", leaveGroup);

// /api/groups/:id
groupsRouter.delete("/:id", deleteGroup);

module.exports = groupsRouter;
