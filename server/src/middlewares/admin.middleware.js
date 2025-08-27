// admin.middleware.js
const authorizeAdmin = (req, res, next) => {
  //TODO: add a mongo config for each role and recheck with db
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ code: "FORBIDDEN", message: "Admin access required" });
  }
  next();
};

module.exports = authorizeAdmin;
