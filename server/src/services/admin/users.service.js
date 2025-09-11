const { Op } = require("sequelize");

const { User } = require("../../modals");

const fetchAllUsers = async ({ page = 1, limit = 10 }) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      attributes: [
        "id",
        "name",
        "email",
        "username",
        "role",
        "status",
        "provider",
        "provider_id",
        "created_at",
        "updated_at",
      ],
      offset,
      limit,
      order: [["created_at", "DESC"]],
      raw: true,
    });

    return { count, users: rows };
  } catch (error) {
    throw error;
  }
};

const getTotalUsers = async () => {
  try {
    return await User.count();
  } catch (error) {
    throw error;
  }
};

const getDbUserRole = async (id, email) => {
  try {
    return await User.findOne({
      attributes: ["role"],
      where: {
        [Op.or]: [{ id }, { email }],
      },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchAllUsers,
  getTotalUsers,
  getDbUserRole,
};
