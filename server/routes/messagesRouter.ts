const messagesRouter = require("express").Router();
const {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

// /api/messages
messagesRouter.route("/").get(getMessages).post(addMessage);

// /api/messages/content
messagesRouter.put("/content", updateMessage);

// api/messages/seen
// messagesRouter.put('/seen', updateSeenMessages);

// /api/messages/:id
messagesRouter.route("/:id").delete(deleteMessage);

module.exports = messagesRouter;
