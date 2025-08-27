const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/auth.controller");
const validate = require("../middlewares/auth-validators/index");

// Login
router.route("/login").post(validate.login, authController.login);

// Logout
router.route("/logout").post(authController.logout);

// Signup
router.route("/signup").post(validate.signup, authController.signup);

// Google
router.route("/google").post(validate.google, authController.googleAuth);

// refreshToken
router
  .route("/refresh")
  .post(validate.refreshToken, authController.refreshAccessToken);

module.exports = router;
