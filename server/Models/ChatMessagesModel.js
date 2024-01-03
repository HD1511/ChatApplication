const mongoose = require('mongoose');

const chatMessagesSchema = mongoose.Schema({
    chatId: {
        type: String
    },
    senderId: {
        type: String
    },
    Message: {
        type: String
    },
}, { timestamps: true })

const ChatMessages = mongoose.model('ChatMessages', chatMessagesSchema);

module.exports = ChatMessages;