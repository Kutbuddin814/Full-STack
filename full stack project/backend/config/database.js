const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("freelancer_erp", "root", "root123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
