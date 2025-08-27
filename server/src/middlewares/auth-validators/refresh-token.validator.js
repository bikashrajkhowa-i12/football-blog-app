// middlewares/validateRefreshToken.js
const validator = require("validator");

const validateRefreshToken = (req, res, next) => {
  const token = req.cookies?.refreshToken;

  if (!token || validator.isEmpty(token)) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  if (!validator.isJWT(token)) {
    return res.status(400).json({ message: "Invalid refresh token format" });
  }

  req.refreshToken = token;
  next();
};

module.exports = validateRefreshToken;
