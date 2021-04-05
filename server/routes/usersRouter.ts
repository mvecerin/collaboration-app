const usersRouter = require("express").Router();
const { getCurrentUser } = require("../controllers/userController");

// /api/users
// router.route('/')
// .get(getUsers)
// .put(changeGroups);

// /api/users/me
usersRouter.get("/me", getCurrentUser);

module.exports = usersRouter;
