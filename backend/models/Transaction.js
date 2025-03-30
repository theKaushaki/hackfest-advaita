const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Stock = require("./Stock");

const Transaction = sequelize.define("Transaction", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    stock_id: { type: DataTypes.INTEGER, references: { model: Stock, key: "id" } },
    type: { type: DataTypes.ENUM("buy", "sell"), allowNull: false },
    shares: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Transaction;
