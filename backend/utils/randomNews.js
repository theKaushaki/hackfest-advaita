const teams = ["Gryffindor Lions", "Slytherin Serpents", "Ravenclaw Eagles", "Hufflepuff Badgers"];
const players = ["Harry Potter", "Draco Malfoy", "Cho Chang", "Cedric Diggory", "Oliver Wood"];
const stockCompanies = ["Nimbus Corp", "Firebolt Inc", "Broomstick Holdings", "Quaffle Dynamics"];
const weatherConditions = ["Heavy Rain", "Strong Winds", "Foggy Conditions", "Clear Sky", "Thunderstorm"];

const eventTemplates = [
    // Match Events
    "{team1} takes an early lead with a stunning goal!",
    "Massive upset! {team2} defeats {team1} in the last second!",
    "Bludger hit! {player} is temporarily out of the match!",
    "Snitch sighted! {player} is racing for it!",
    "{team1} keeper makes an unbelievable save!",
    
    // Stock Market News
    "{company} stock surges by {percent}% after major sponsorship deal!",
    "Market crash! {company} stock drops by {percent}% due to unexpected scandal!",
    "Analysts predict a strong buy for {company} stocks after recent performance.",

    // Weather Reports
    "Unpredictable weather: {weather} is affecting player visibility!",
    "{weather} delays the match start by 10 minutes!",
    "{team1} players struggling in {weather} conditions!",

    // Team Drama & Scandals
    "{player} involved in off-field controversy! How will this impact the team?",
    "{team1} coach under fire after questionable lineup choices!",
    "{player} rumored to be transferring to a rival team!",
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPercentage() {
    return (Math.random() * (15 - 2) + 2).toFixed(1); // Generates percentage between 2% and 15%
}

function generateRandomNews() {
    let eventTemplate = getRandomItem(eventTemplates);

    const newsText = eventTemplate
        .replace("{team1}", getRandomItem(teams))
        .replace("{team2}", getRandomItem(teams))
        .replace("{player}", getRandomItem(players))
        .replace("{company}", getRandomItem(stockCompanies))
        .replace("{weather}", getRandomItem(weatherConditions))
        .replace("{percent}", getRandomPercentage());

    return {
        id: Date.now(),
        text: newsText,
        timestamp: new Date().toLocaleTimeString()
    };
}

module.exports = { generateRandomNews };
