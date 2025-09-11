// admin.middleware.js

const { getDbUserRole } = require("../services/admin/users.service");

const authorizeAdmin = async (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const { role = "user" } = await getDbUserRole(
      req?.user?.id,
      req?.user?.email
    );
    if (role && role === req?.user?.role) {
      next();
    } else {
      return res
        .status(403)
        .json({ code: "FORBIDDEN", message: "Admin access required" });
    }
  } catch (error) {
    console.error("Auth error:", error || error.message);
    return res.status(401).json({
      message: error.message || "Invalid or expired token",
    });
  }
};

module.exports = authorizeAdmin;
