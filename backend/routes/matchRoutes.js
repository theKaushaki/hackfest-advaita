const express = require('express');
const { initializeMatch, simulateMatchEvents, finalizeMatch } = require('../services/matchService');
const { updateStockPrices } = require('../services/stockService');

const router = express.Router();

router.post('/simulate', async (req, res) => {
    try {
        const match = await initializeMatch();
        await simulateMatchEvents(match);
        const winner = await finalizeMatch(match);

        await updateStockPrices(winner);

        res.status(200).json({ message: "Match simulated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
