const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "Project",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    client: { type: DataTypes.STRING, allowNull: false },
    deadline: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM("Pending", "In Progress", "Completed"), allowNull: false, defaultValue: "Pending" }
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

module.exports = Project;
