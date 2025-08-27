const list = async (req, res) => {
  try {
    const {
      type,
      tags,
      author,
      limit = 10,
      page = 1,
      sort = "latest",
      all = false,
    } = req.query;

    const filters = {};

    if (type === "featured") filters.featured = true;
    if (type === "trending") filters.trending = true;
    if (tags) filters.tags = { $in: tags.split(",") };
    if (author) filters.author = author;

    const query = Blog.find(filters);

    // Sorting
    if (sort === "latest") query.sort({ createdAt: -1 });
    else if (sort === "oldest") query.sort({ createdAt: 1 });
    else if (sort === "popular") query.sort({ likes: -1 });

    // Pagination
    if (!all) {
      const skip = (page - 1) * limit;
      query.skip(skip).limit(parseInt(limit));
    }

    const blogs = await query.exec();

    res.json({ blogs, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  list,
};
