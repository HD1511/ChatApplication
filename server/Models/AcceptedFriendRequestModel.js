const mongoose = require('mongoose');

const acceptedFriendRequestSchema = mongoose.Schema({
    senderId: {
        type: String
    },
    senderName: {
        type: String
    },
    senderAvatar: {
        type: String
    },
    recieverId: {
        type: String
    },
    recieverName: {
        type: String
    },
    recieverAvatar: {
        type: String
    }
})

const AcceptedFriendRequest = mongoose.model('AcceptedFriendRequest', acceptedFriendRequestSchema);

module.exports = AcceptedFriendRequest;