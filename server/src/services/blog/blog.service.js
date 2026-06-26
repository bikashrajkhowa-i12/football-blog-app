const { blogs } = require("../../demo/data");
const { Blog } = require("../../modals");

const getAllBlogs = async (query = {}) => {
  try {
    //TODO: Fetch from database
    let list = await blogs;
    const { search } = query;
    if (search) {
      const searchTerm = search.toLowerCase().trim();
      list = list.filter((blog) => {
        const titleMatch = blog.title?.toLowerCase().includes(searchTerm);
        const previewMatch = blog.preview?.toLowerCase().includes(searchTerm);
        const categoryMatch = blog.category?.toLowerCase().includes(searchTerm);
        const authorMatch = blog.author?.toLowerCase().includes(searchTerm);
        const tagsMatch = blog.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));
        return titleMatch || previewMatch || categoryMatch || authorMatch || tagsMatch;
      });
    }
    return list;
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
