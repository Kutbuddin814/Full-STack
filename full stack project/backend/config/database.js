const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("freelancer_erp", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
