const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const authorizeAdmin = require("../middlewares/admin.middleware");

// Admin Dashboard
router.route("/dashboard").post(authenticateUser, authorizeAdmin);

// Content-Management
router.route("/content-management").post(authenticateUser, authorizeAdmin);

// All-users
router.route("/users").post(authenticateUser, authorizeAdmin);

// Settings
router.route("/settings").post(authenticateUser, authorizeAdmin);

module.exports = router;
