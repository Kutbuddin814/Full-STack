const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    client: { type: DataTypes.STRING, allowNull: false }, // username or unique id of client
    amount: { type: DataTypes.FLOAT, allowNull: false },
    due: { type: DataTypes.DATEONLY, allowNull: false },
    status: {
      type: DataTypes.ENUM("Pending", "Paid", "Overdue"),
      allowNull: false,
      defaultValue: "Pending"
    }
  },
  {
    tableName: "invoices",
    timestamps: true,
  }
);

module.exports = Invoice;
