const { verifyToken } = require("../utils/tokenUtil");

module.exports = (req: any, res: any, next: any) => {
  let token = req.headers["token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "No token",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({
      success: false,
      msg: "Wrong token",
    });
  }

  req.decoded = decoded;
  next();
};
