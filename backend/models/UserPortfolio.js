const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Stock = require("./Stock");

const UserPortfolio = sequelize.define("UserPortfolio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    stock_id: { type: DataTypes.INTEGER, references: { model: Stock, key: "id" } },
    shares_owned: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
});

module.exports = UserPortfolio;
