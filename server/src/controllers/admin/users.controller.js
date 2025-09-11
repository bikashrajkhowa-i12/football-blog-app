const { fetchAllUsers } = require("../../services/admin/users.service");

const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);

    const data = await fetchAllUsers({ page, limit });

    res.status(200).json({ ...data, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Failed to load Users!",
      stack: error,
    });
  }
};

module.exports = {
  getAllUsers,
};
