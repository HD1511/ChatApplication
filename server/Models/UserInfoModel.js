const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    Email : {
        type : String
    },
    Username : {
        type : String
    },
    Password : {
        type : String
    },
    PhoneNo : {
        type : Number,
        default : null
    },
    Avatar : {
        type : String,
        default : 'default.jpg'
    },
    TotalFriends : {
        type : Number,
        default : 0
    }
})

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;