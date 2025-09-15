const { blogs } = require("../../demo/data");
const { Blog } = require("../../modals");

const getAllBlogs = async () => {
  try {
    //TODO: Fetch from database
    return await blogs;
  } catch (error) {
    throw error;
  }
};

const fetchBlogBySlugFromDb = async (slug) => {
  try {
    //TODO: Fetch from databse
    return (await blogs.find((b) => b.slug === slug)) || null;
  } catch (error) {
    throw error;
  }
};

const createBlog = async (blogObj) => {
  try {
    return await Blog.create(blogObj);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBlogs,
  fetchBlogBySlugFromDb,
  createBlog,
};
