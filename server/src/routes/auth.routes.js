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

// Google (O-Auth 2.0)
router
  .route("/google/callback")
  .get(validate.googleAuth, authController.googleAuth);

// refreshToken
router
  .route("/refresh")
  .post(validate.refreshToken, authController.refreshAccessToken);

module.exports = router;
