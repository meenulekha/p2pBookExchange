function handleChatMessage(message) {
    // Logic to process and store the message
    // Emit the message to relevant users or chat rooms
    io.emit('chat message', message);
}

module.exports = {
    handleChatMessage
};