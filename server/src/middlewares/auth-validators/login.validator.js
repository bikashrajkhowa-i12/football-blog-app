const validator = require("validator");

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Email format check
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password length check (can tweak for your policy)
  if (!validator.isLength(password, { min: 6, max: 100 })) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  next();
};

module.exports = loginValidator;
