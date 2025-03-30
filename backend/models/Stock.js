const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Stock = sequelize.define("Stock", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    base_price: { type: DataTypes.FLOAT, allowNull: false },
    volatility: { type: DataTypes.FLOAT, allowNull: false },
    risk_level: { type: DataTypes.ENUM("High", "Medium", "Low"), allowNull: false }
});

module.exports = Stock;
