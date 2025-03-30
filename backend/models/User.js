const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    balance: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 10000 } // Default 10,000 Galleons
});

module.exports = User;
