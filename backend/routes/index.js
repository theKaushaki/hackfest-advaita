const express = require("express");
const router = express.Router();

const matchRoutes = require("./matchRoutes");  // Import match routes

// Register all routes here
router.use("/match", matchRoutes);

module.exports = router;
