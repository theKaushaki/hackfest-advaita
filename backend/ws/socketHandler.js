const { Server } = require('socket.io');

function setupWebSockets(server) {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
}

function sendMatchUpdate(io, matchEvent) {
    io.emit('matchUpdate', matchEvent);
}

function sendStockUpdate(io, stockData) {
    io.emit('stockUpdate', stockData);
}

module.exports = { setupWebSockets, sendMatchUpdate, sendStockUpdate };
