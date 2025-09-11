const express = require("express");
const router = express.Router();

const {
  blogValidator,
} = require("../middlewares/blog-validators/blog.validator");
const blogsController = require("../controllers/blog/blog.controller");

// List of blogs (add pagenation)
router.route("/blogs").get(blogsController.blogs);

router.route(`/blog/:slug`).get(blogValidator, blogsController.getBlogBySlug);

// Featured blogs
// router.route("/featured").post();

module.exports = router;
