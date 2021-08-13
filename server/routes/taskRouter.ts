const tasksRouter = require("express").Router();
const {
  getTasks,
  addTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

// /api/tasks/groupId
tasksRouter.get("/:groupId", getTasks);

// /api/tasks
tasksRouter.route("/").post(addTask).put(editTask);

// /api/tasks/:id
tasksRouter.delete("/:id", deleteTask);

module.exports = tasksRouter;
