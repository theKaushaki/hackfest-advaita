const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require("./Team");

const Player = sequelize.define("Player", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    speed: { type: DataTypes.INTEGER, allowNull: false },
    accuracy: { type: DataTypes.INTEGER, allowNull: false },
    strength: { type: DataTypes.INTEGER, allowNull: false },
    reflexes: { type: DataTypes.INTEGER, allowNull: false },
    endurance: { type: DataTypes.INTEGER, allowNull: false },
    intelligence: { type: DataTypes.INTEGER, allowNull: false },
    team_id: { type: DataTypes.INTEGER, references: { model: "Teams", key: "id" } }
});

// Define Relationships
Team.hasMany(Player, { foreignKey: "team_id" });
Player.belongsTo(Team, { foreignKey: "team_id" });

module.exports = Player;
