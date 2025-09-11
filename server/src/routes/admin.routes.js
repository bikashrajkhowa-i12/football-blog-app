const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const authorizeAdmin = require("../middlewares/admin.middleware");
const adminController = require("../controllers/admin/index");

// Admin Dashboard
router
  .route("/dashboard")
  .get(authenticateUser, authorizeAdmin, adminController.dashboard);

// Content-Management
// router
//   .route("/content-management/blogs")
//   .get(authenticateUser, authorizeAdmin, adminController.blogs);

// All-users
router
  .route("/users")
  .get(authenticateUser, authorizeAdmin, adminController.getAllUsers);

// Settings
router.route("/settings").post(authenticateUser, authorizeAdmin);

module.exports = router;
