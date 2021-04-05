const jwt = require("jsonwebtoken");

module.exports.createToken = (payload: any) => {
  return jwt.sign({ ...payload }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

module.exports.verifyToken = (token: any) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
