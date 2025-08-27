const { verifyAccessToken } = require("../services/auth/jwt-service");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ code: "NO_TOKEN", message: "Access token missing" });
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (err) {
    console.error("Auth error:", err.error || err.message);
    return res.status(401).json({
      message: err.message || "Invalid or expired token",
    });
  }
};

module.exports = authenticateUser;
