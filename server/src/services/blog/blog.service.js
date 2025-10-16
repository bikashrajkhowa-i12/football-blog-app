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

const getDrafts = async () => {
  try {
    const response = await Blog.find({ status: "draft" }).lean();
    return response;
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
    const imgUrl = await handleImageUpload(blogObj); //s3 image upload!

    const updatedObj = { ...blogObj, image_url: imgUrl || "" };
    return await Blog.create(updatedObj);
  } catch (error) {
    throw error;
  }
};

const handleImageUpload = async (blogObj) => {
  try {
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBlogs,
  getDrafts,
  fetchBlogBySlugFromDb,
  createBlog,
};
