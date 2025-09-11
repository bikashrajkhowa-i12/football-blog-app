const {
  getAllBlogs,
  fetchBlogBySlugFromDb,
} = require("../../services/blog/blog.service");

const blogs = async (req, res) => {
  try {
    const list = await getAllBlogs();
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

const getBlogBySlug = async (req, res) => {
  try {
    const { slug = "" } = req?.params || {};
    const blog = await fetchBlogBySlugFromDb(slug);
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
module.exports = {
  blogs,
  getBlogBySlug,
};
