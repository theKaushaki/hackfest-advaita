const socketIo = require("socket.io");

function initializeWebSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Client Connected");

        socket.on("subscribeToStockUpdates", () => {
            setInterval(async () => {
                const stocks = await Stock.findAll();
                socket.emit("stockUpdate", stocks);
            }, 5000);
        });

        socket.on("disconnect", () => {
            console.log("Client Disconnected");
        });
    });

    return io;
}

module.exports = { initializeWebSocket };

socket.on("buyStock", async (data) => {
    const result = await buyStock(data.userId, data.stockId, data.shares);
    io.emit("tradeUpdate", result);
});
