const { dashboard } = require("./dashboard.controller");
const contentManagement = require("./content-management.controller");
const users = require("./users.controller");

module.exports = {
  dashboard,
  ...contentManagement,
  ...users,
};
