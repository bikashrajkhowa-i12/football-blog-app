const { getTotalUsers } = require("../../services/admin/users.service");

const dashboard = async (req, res) => {
  try {
    const totalUsers = await getTotalUsers();
    const totalBlogs = 100; //await getTotalBlogs(); TODO: get the count from mongo blogs db.
    const totalViews = 20000; //TODO: setup siteview and fetch it//
    res.status(200).json({
      totalUsers,
      totalBlogs,
      totalViews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to load dashboard data",
    });
  }
};

module.exports = {
  dashboard,
};
