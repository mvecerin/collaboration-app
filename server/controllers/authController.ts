import { NextFunction, Request, Response } from "express";
import User from "../models/User";
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/tokenUtil");

module.exports.signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify e-mail
    const { email, password } = req.body;
    let user = await User.findOne({ email: email }).select("+password").exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(403).json({
        success: false,
        msg: "Incorrect password",
      });
    } else {
      // Create token
      const dataForToken = (({ name, _id }) => ({ name, _id }))(user);
      // let { password, __v, ...rest } = user.toObject();
      const token = createToken(dataForToken);
      if (!token) {
        throw new Error("Token error");
      }
      res.json({
        success: true,
        token: token,
        data: dataForToken,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports.signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if e-mail exists
    const { email } = req.body;
    let user = await User.findOne({ email: email }).exec();
    if (user) {
      return res.status(409).json({
        success: false,
        msg: "E-mail already used",
      });
    }
    // Create user and hash password
    let newUser = new User({ ...req.body });
    let hash = await bcrypt.hash(newUser.password, 10);
    if (!hash) {
      throw new Error("Hashing error");
    }
    newUser.password = hash;
    // Save user
    let result = await newUser.save();
    if (!result) {
      throw new Error("Sign up failed");
    }
    res.json({ success: true, insertId: result._id });
  } catch (e) {
    next(e);
  }
};
