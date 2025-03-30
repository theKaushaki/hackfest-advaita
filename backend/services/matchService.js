const { Match, Team } = require("../models"); 

async function initializeMatch() {
    // Fetch two random teams
    const teams = await Team.findAll({ order: sequelize.random(), limit: 2 });
    if (teams.length < 2) {
        throw new Error("Not enough teams to start a match.");
    }

    // Create new match entry
    const match = await Match.create({
        teamA_id: teams[0].id,
        teamB_id: teams[1].id,
        status: "ongoing",
        startTime: new Date()
    });

    console.log(`Match Initialized: ${teams[0].name} vs ${teams[1].name}`);

    return match;
}

module.exports = { initializeMatch };

const { MatchEvent, Player, Match } = require("../models");

// Probability-Based Event Generator
function getRandomEvent() {
    const events = [
        { type: "Goal", probability: 0.6 },
        { type: "Bludger Hit", probability: 0.3 },
        { type: "Snitch Capture", probability: 0.1 },
        { type: "Foul", probability: 0.2 },
        { type: "Keeper Save", probability: 0.4 }
    ];
    return events.find(e => Math.random() < e.probability);
}

// Simulate Events in an Ongoing Match
async function simulateMatchEvents(matchId) {
    const match = await Match.findByPk(matchId);
    if (!match || match.status !== "ongoing") return;

    // Get Players from both teams
    const teamAPlayers = await Player.findAll({ where: { team_id: match.teamA_id } });
    const teamBPlayers = await Player.findAll({ where: { team_id: match.teamB_id } });

    for (let second = 0; second < 120; second += 5) { // Simulating event every 5 seconds
        const event = getRandomEvent();
        if (!event) continue;

        // Pick a random player from either team
        const team = Math.random() < 0.5 ? teamAPlayers : teamBPlayers;
        const player = team[Math.floor(Math.random() * team.length)];

        // Save event in database
        await MatchEvent.create({
            match_id: matchId,
            type: event.type,
            team_id: team[0].team_id,
            player_id: player.id
        });

        console.log(`Event: ${event.type} by ${player.name} at ${second}s`);
        
        if (event.type === "Snitch Capture") {
            match.status = "finished";
            await match.save();
            break;
        }
    }

    match.status = "finished";
    await match.save();
}

module.exports = { simulateMatchEvents };


async function determineMatchWinner(matchId) {
    const events = await MatchEvent.findAll({ where: { match_id: matchId } });

    let teamAScore = 0;
    let teamBScore = 0;
    let winner = null;

    for (const event of events) {
        if (event.type === "Goal") {
            event.team_id === match.teamA_id ? (teamAScore += 30) : (teamBScore += 30);
        } else if (event.type === "Snitch Capture") {
            event.team_id === match.teamA_id ? (teamAScore += 150) : (teamBScore += 150);
        }
    }

    winner = teamAScore > teamBScore ? match.teamA_id : match.teamB_id;

    await Match.update(
        { winner_id: winner, final_score: `${teamAScore} - ${teamBScore}` },
        { where: { id: matchId } }
    );

    console.log(`Match ${matchId} finished! Winner: Team ${winner}`);
}

module.exports = { determineMatchWinner };


const { updateStockPrices } = require("../services/stockService");
const { io } = require("../ws/websocket");

async function finalizeMatch(matchId) {
    const match = await Match.findByPk(matchId);
    if (!match) return;

    await updateStockPrices(match);

    io.emit("matchFinished", { matchId, winner: match.winner_id });

    console.log(`Match ${matchId} finalized. Stock prices updated.`);
}

module.exports = { finalizeMatch };
