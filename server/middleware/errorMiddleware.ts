import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces";

module.exports = (
  err: any,
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const msg = err.message || "Something went wrong";
  console.error(`Error: ${msg}`);
  console.error("Request body:\n", req.body);
  res.status(status).json({ success: false, msg });
};
