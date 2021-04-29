import { Response } from "express";
import { IRequestWithUser } from "../interfaces";

module.exports.getCurrentUser = (req: IRequestWithUser, res: Response) => {
  res.json({ success: true, data: req.decoded });
};
