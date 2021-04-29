const { signin, signup } = require("../controllers/authController");
const authRouter = require("express").Router();

// POST /api/auth/login
authRouter.post("/signin", signin);

// POST /api/auth/signup
authRouter.post("/signup", signup);

module.exports = authRouter;
