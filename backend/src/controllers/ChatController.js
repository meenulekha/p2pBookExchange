function handleChatMessage(message) {
    // Logic to process and store the message
    io.emit('chat message', message);
}

module.exports = {
    handleChatMessage
};