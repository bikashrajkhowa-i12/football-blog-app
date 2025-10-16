const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");
const authorizeAdmin = require("../middlewares/admin.middleware");

const {
  blogValidator,
  createBlogValidator,
} = require("../middlewares/blog-validators/blog.validator");
const blogsController = require("../controllers/blog/blog.controller");

// List of blogs (add pagenation)
router.route("/blogs").get(blogsController.blogs);

// draft blogs
router.route("/blogs/drafts").get(blogsController.drafts);

//fetch specific blog by slug
router.route(`/blog/:slug`).get(blogValidator, blogsController.getBlogBySlug);

//create blog
router
  .route(`/blog/create`)
  .post(
    authenticateUser,
    authorizeAdmin,
    createBlogValidator,
    blogsController.createBlog
  );
// Featured blogs
// router.route("/featured").post();

module.exports = router;
