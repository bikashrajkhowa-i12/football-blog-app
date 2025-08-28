const validator = require("validator");

const googleAuthValidator = (req, res, next) => {
  try {
    const { state = "", code = "" } = req.query || {};
    const savedState = req.cookies?.oauth_state; // state saved by Next.js server

    // Validate presence
    if (!state || !savedState) {
      return res.status(400).json({ message: "Missing CSRF state" });
    }

    if (!code || !validator.isLength(code, { min: 20 })) {
      // Google OAuth codes are usually at least ~20 chars
      return res
        .status(400)
        .json({ message: "Invalid or missing Google code" });
    }

    // Validate state matches
    if (!validator.equals(state, savedState)) {
      res.clearCookie("oauth_state", { path: "/" }); // clear cookie reliably
      return res.status(400).json({ message: "Invalid CSRF state" });
    }

    // Valid state & code, clear state cookie to prevent reuse
    res.clearCookie("oauth_state", { path: "/" });

    next();
  } catch (error) {
    console.error("Google validation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = googleAuthValidator;
