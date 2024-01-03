const mongoose = require('mongoose');

const pendingFriendRequestSchema = mongoose.Schema({
    senderId : {
        type : String
    },
    recieverId : {
        type : String
    },
    senderName : {
        type : String
    },
    senderAvatar : {
        type : String
    }
})

const PendingFriendRequest = mongoose.model('PendingFriendRequest', pendingFriendRequestSchema);

module.exports = PendingFriendRequest;