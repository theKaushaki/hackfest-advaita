const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Team = sequelize.define("Team", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    logo: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Team;
