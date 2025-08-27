const validator = require("validator");

const googleValidator = (req, res, next) => {
  const { credential } = req.body;

  if (!credential || !validator.isJWT(credential)) {
    return res.status(400).json({ message: "Invalid or missing credential" });
  }

  next();
};

module.exports = googleValidator;
