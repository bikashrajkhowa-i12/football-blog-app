const { User } = require("../../modals/index");

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ where: { email, status: "active" } });
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    return await User.findOne({ where: { id }, status: "active" });
  } catch (error) {
    throw error;
  }
};

const findUserByProviderId = async (providerId) => {
  try {
    return await User.findOne({
      where: { provider_id: providerId },
      status: "active",
    });
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    return await User.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  findUserByProviderId,
  createUser,
};
