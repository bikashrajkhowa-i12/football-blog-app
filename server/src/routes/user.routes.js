const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

// Profile
router.route("/profile").post(authenticateUser);

// Update user-profile
router.route("/update-profile").post(authenticateUser);

module.exports = router;
