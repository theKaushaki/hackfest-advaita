const { generateAllTeams } = require("../services/teamService");
const sequelize = require("../config/database");

sequelize.sync().then(async () => {
    await generateAllTeams();
    process.exit();
});
