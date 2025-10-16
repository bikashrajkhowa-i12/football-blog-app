const blogService = require("../../services/blog/blog.service");

const blogDto = require("../../dtos/blog.dto");

const blogs = async (req, res) => {
  try {
    const list = await blogService.getAllBlogs();
    res.status(200).json({
      blogs: list,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Failed to fetch blogs from database!",
    });
  }
};

const drafts = async (req, res) => {
  try {
    const list = await blogService.getDrafts();
    res.status(200).json({
      drafts: list || [],
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Failed to fetch drafts from database",
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug = "" } = req?.params || {};
    const blog = await blogService.fetchBlogBySlugFromDb(slug);
    res.status(200).json({
      blog,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Blog post not found!",
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const blogData = req?.body || {};
    const blogObj = new blogDto.CreateBlog(blogData, req?.user?.id);
    const blog = await blogService.createBlog(blogObj);
    res
      .status(200)
      .json({ blog, message: "New blog-post created successfully!" });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Failed to create blog!",
    });
  }
};

module.exports = {
  blogs,
  drafts,
  getBlogBySlug,
  createBlog,
};
