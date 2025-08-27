//import all the modals from package

const sequelize = require("../../db/pg");

module.exports = {
  User: require("@bikashrajkhowa-i12/blackboxcore").PG.footballBlog_User(
    sequelize
  ),
};
