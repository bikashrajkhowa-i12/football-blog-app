const validator = require("validator");

const blogValidator = (req, res, next) => {
  const { slug } = req?.params || {};

  if (!slug || validator.isEmpty(slug.trim())) {
    return res.status(400).json({ error: "Slug parameter is required" });
  }

  next();
};

module.exports = {
  blogValidator,
};
