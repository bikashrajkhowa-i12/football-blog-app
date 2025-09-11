const express = require("express");
const router = express.Router();

const authRoutes = require("./src/routes/auth.routes.js");
const blogRoutes = require("./src/routes/blog.routes.js");
const adminRoutes = require("./src/routes/admin.routes.js");
const userRoutes = require("./src/routes/user.routes.js");

router.use("/api/auth", authRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api", blogRoutes);
// router.use("/api/user", userRoutes);

module.exports = router;
