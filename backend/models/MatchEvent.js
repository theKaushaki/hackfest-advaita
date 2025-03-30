const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MatchEvent = sequelize.define('MatchEvent', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    match_id: { type: DataTypes.UUID, allowNull: false },
    event_type: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = MatchEvent;
