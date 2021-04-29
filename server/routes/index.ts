import { Response, Request } from "express";

const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

// Public
router.use("/auth", require("./authRouter"));

// Middleware for protected routes
router.use(authMiddleware);

// Protected
router.use("/groups", require("./groupsRouter"));
router.use("/users", require("./usersRouter"));
router.use("/messages", require("./messagesRouter"));

router.get("*", (req: Request, res: Response) =>
  res.status(404).json({ msg: "Wrong API call" })
);

module.exports = router;
