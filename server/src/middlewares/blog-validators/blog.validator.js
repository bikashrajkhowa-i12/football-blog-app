const validator = require("validator");

const blogValidator = (req, res, next) => {
  const { slug } = req?.params || {};

  if (!slug || validator.isEmpty(slug.trim())) {
    return res.status(400).json({ error: "Slug parameter is required" });
  }

  next();
};

const createBlogValidator = (req, res, next) => {
  const { title, preview, content, author_details, category } = req?.body || {};
  const errors = {};

  if (!title || validator.isEmpty(title.trim())) {
    errors.title = "Title is required";
  }

  if (!preview || validator.isEmpty(preview.trim())) {
    errors.preview = "Preview is required";
  }

  if (!content || validator.isEmpty(content.trim())) {
    errors.content = "Content is required";
  }

  if (
    !author_details ||
    typeof author_details !== "object" ||
    !author_details.name
  ) {
    errors.author_details = "Author details (author + author_id) are required";
  }

  if (!category || validator.isEmpty(category.trim())) {
    errors.category = "Category is required";
  }

  // if there are errors, stop request
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  blogValidator,
  createBlogValidator,
};
