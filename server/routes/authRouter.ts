const { login, signup } = require("../controllers/authController");
const authRouter = require("express").Router();

// POST /api/auth/login
authRouter.post("/login", login);

// POST /api/auth/signup
authRouter.post("/signup", signup);

module.exports = authRouter;
