require("dotenv").config();  // Load environment variables

const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const { generateRandomNews } = require("./utils/randomNews");

const app = express();
const PORT = process.env.PORT || 4000;  // Use port from .env or default to 4000

// Middleware
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse JSON request bodies

// Simple Route to Check Server
app.get("/", (req, res) => {
    res.send("Gringotts Exchange Backend is Running!");
});

// Import Routes (Define them in separate files later)
const routes = require("./routes");  // Import all routes
app.use("/api", routes); // Match Simulation Routes

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

setInterval(() => {
  const news = generateRandomNews();
  io.emit("newsUpdate", news);
  console.log("News Broadcasted:", news);
}, 10000);
