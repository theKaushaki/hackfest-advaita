const { Stock, StockHistory } = require("../models");

async function updateStockPrices(match) {
    const winningTeam = match.winner_id;
    const losingTeam = match.teamA_id === winningTeam ? match.teamB_id : match.teamA_id;

    const stocks = await Stock.findAll();
    for (const stock of stocks) {
        let priceChange = Math.random() * 0.02 - 0.01; // Random small fluctuation

        if (stock.sponsored_team === winningTeam) {
            priceChange += 0.03;
        } else if (stock.sponsored_team === losingTeam) {
            priceChange -= 0.02;
        }

        stock.base_price *= (1 + priceChange);
        await stock.save();

        await StockHistory.create({
            stock_id: stock.id,
            price: stock.base_price,
            timestamp: new Date()
        });

        console.log(`${stock.name} updated: New Price - ${stock.base_price.toFixed(2)}`);
    }
}

module.exports = { updateStockPrices };
