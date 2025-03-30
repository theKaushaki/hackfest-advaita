const Team = require("../models/Team");
const Player = require("../models/Player");

// List of Quidditch Team Names
const teamNames = [
    "Puddlemere United",
    "Holyhead Harpies",
    "Montrose Magpies",
    "Tutshill Tornadoes",
    "Wimbourne Wasps",
    "Ballycastle Bats",
    "Chudley Cannons",
    "Kenmare Kestrels",
    "Falmouth Falcons"
];

// Generate Random Stats for Players
function generatePlayerStats(position) {
    return {
        speed: Math.floor(Math.random() * 100),
        accuracy: position === "Chaser" ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 50),
        strength: position === "Beater" ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 50),
        reflexes: position === "Keeper" ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * 50),
        endurance: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
    };
}

// Generate a Random Team
async function generateTeam(teamName) {
    const team = await Team.create({ name: teamName });

    const players = [
        { name: `Seeker_${Math.random().toString(36).substr(2, 5)}`, position: "Seeker", ...generatePlayerStats("Seeker") },
        { name: `Chaser_${Math.random().toString(36).substr(2, 5)}`, position: "Chaser", ...generatePlayerStats("Chaser") },
        { name: `Chaser_${Math.random().toString(36).substr(2, 5)}`, position: "Chaser", ...generatePlayerStats("Chaser") },
        { name: `Chaser_${Math.random().toString(36).substr(2, 5)}`, position: "Chaser", ...generatePlayerStats("Chaser") },
        { name: `Beater_${Math.random().toString(36).substr(2, 5)}`, position: "Beater", ...generatePlayerStats("Beater") },
        { name: `Beater_${Math.random().toString(36).substr(2, 5)}`, position: "Beater", ...generatePlayerStats("Beater") },
        { name: `Keeper_${Math.random().toString(36).substr(2, 5)}`, position: "Keeper", ...generatePlayerStats("Keeper") }
    ];

    for (const player of players) {
        await Player.create({ ...player, team_id: team.id });
    }

    console.log(`Team ${teamName} generated successfully!`);
}

// Generate & Save All Teams
async function generateAllTeams() {
    for (const name of teamNames) {
        await generateTeam(name);
    }
    console.log("All teams and players have been created.");
}

module.exports = { generateAllTeams };
