const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//integrate the reminder feature
require('./meetupReminders');

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (message) => {
        console.log('Message:', message);
        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});
