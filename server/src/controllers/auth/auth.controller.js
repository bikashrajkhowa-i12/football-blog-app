const authDto = require("../../dtos/auth.dto");
const authService = require("../../services/auth/auth.service");
const { setAuthCookies, clearAuthCookies } = require("../../utils/cookies");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user, isAuthenticated } =
      await authService.login({
        email,
        password,
      });

    setAuthCookies(res, refreshToken);

    res.status(201).json({
      accessToken,
      user,
      isAuthenticated,
      message: "Login successful",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: err.message || "Login failed!", stack: err });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    clearAuthCookies(res);
    res.status(201).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Logout failed!" });
  }
};

// Register a new user
const signup = async (req, res) => {
  try {
    const signupDto = new authDto.Signup(req.body);
    const { accessToken, refreshToken, user, isAuthenticated } =
      await authService.signup(signupDto);

    setAuthCookies(res, refreshToken);

    res.status(201).json({
      accessToken,
      user,
      isAuthenticated,
      message: "Signup successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Sign up failed! Please try again!" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    // 1. Verify reset token
    // 2. Hash new password
    // 3. Save user with new password
    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { code } = req?.query;
    const { refreshToken } = await authService.authenticateWithGoogle(code);

    setAuthCookies(res, refreshToken);

    res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.error(
      "Error exchanging code:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const token = req.refreshToken;
    const { newAccessToken, user, isAuthenticated } =
      await authService.renewAuthTokens(token);
    res
      .status(201)
      .json({ accessToken: newAccessToken, user, isAuthenticated });
  } catch (err) {
    console.log(err);
    clearAuthCookies(res);
    res.status(401).json({ message: `Invalid refresh token! ${err.message}` });
  }
};

module.exports = {
  login,
  logout,
  signup,
  googleAuth,
  refreshAccessToken,
};
