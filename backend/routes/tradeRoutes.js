const express = require("express");
const { buyStock, sellStock } = require("../services/tradeService");
const router = express.Router();

router.post("/buy", async (req, res) => {
    try {
        const { userId, stockId, shares } = req.body;
        const result = await buyStock(userId, stockId, shares);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/sell", async (req, res) => {
    try {
        const { userId, stockId, shares } = req.body;
        const result = await sellStock(userId, stockId, shares);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
