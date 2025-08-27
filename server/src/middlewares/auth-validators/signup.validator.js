const validator = require("validator");

const signupValidator = (req, res, next) => {
  const { email, password, confirm_password } = req.body;

  // 1. Required fields check
  if (!email || !password || !confirm_password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // 2. Email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // 3. Password validation
  if (!validator.isLength(password, { min: 6, max: 100 })) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  // 4. Check password mis-match
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  next();
};

module.exports = signupValidator;
