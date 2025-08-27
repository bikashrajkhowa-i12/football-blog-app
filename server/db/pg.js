const { Sequelize } = require("sequelize");

const connectionString = process.env.PG_URI;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false, // set true if you want to see raw SQL
});

module.exports = sequelize;
