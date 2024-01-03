const AcceptedFriendRequest = require('../Models/AcceptedFriendRequestModel.js');
const UserInfo = require('../Models/UserInfoModel.js');
const ChatMessages = require('../Models/ChatMessagesModel.js');
const PendingFriendRequest = require('../Models/PendingFriendRequestModel.js');

const jwt = require('jsonwebtoken');

const { ResponseHandler } = require('../utils/ResponseHandler.js');

module.exports = {

    Authentication: async (req, res, next) => {
        const { token } = req.cookies;

        try {

            const user = jwt.verify(token, '123456789');
            const UserDetails = await UserInfo.findById(user._id);

            ResponseHandler(200, 'Success', 'User is authorized!!!', res, UserDetails);

        } catch (err) {
            ResponseHandler(200, 'Failed', 'User is not authorized!!!', res);
        }
    },

    Login: async (req, res) => {
        try {

            const { Email, Password } = req.body;
            const isPresentInDatabase = await UserInfo.findOne({ Email });

            if (!isPresentInDatabase) {
                ResponseHandler(200, 'Not Found', 'User Not Found!!!', res);
            }

            if (isPresentInDatabase) {
                if (isPresentInDatabase.Password === Password) {
                    console.log(isPresentInDatabase);

                    const token = jwt.sign({ _id: isPresentInDatabase._id }, '123456789');

                    res.cookie("token", token, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true
                    });

                    ResponseHandler(200, 'Success', 'Login successfully!!!', res);

                } else {
                    ResponseHandler(200, 'Failed', 'Wrong credentials!!!', res);
                }
            }

        } catch (e) {
            console.log(e);
        }
    },

    SignUp: async (req, res) => {
        try {

            const { Email, Username, Password, Avatar } = req.body;
            const isPresentInDatabase = await UserInfo.findOne({ Email });

            if (isPresentInDatabase) {

                ResponseHandler(200, 'Failed', 'User already present!!!', res);

            } else {

                const insertIntoDatabase = new UserInfo({ Email, Username, Password, Avatar });
                await UserInfo.insertMany([insertIntoDatabase]);

                ResponseHandler(200, 'Success', 'Sign up successfully!!!', res);

            }

        } catch (e) {
            console.log(e);
        }
    },

    Logout: async (req, res) => {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        });

        ResponseHandler(200, 'Success', 'Logged out successfully!!!', res);

    },

    SearchUser: async (req, res) => {
        try {

            const { usernameToFindUserInput } = req.query;
            const allUserDetails = await UserInfo.find({ Username: { $regex: usernameToFindUserInput, $options: "i" } });

            ResponseHandler(200, 'Success', "You're searched users!!!", res, allUserDetails);

        } catch (e) {
            ResponseHandler(200, 'Failed', "You've done something wrong!!!", res);
        }
    },

    ChatMessages: async (req, res) => {
        try {

            const { senderId, chatId, Message } = req.body;
            const insertMessage = new ChatMessages({ chatId, senderId, Message });
            await ChatMessages.insertMany([insertMessage]);

            ResponseHandler(200, 'Success', "Message send successfully!!!", res);

        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }
    },

    GetAllChatMessages: async (req, res) => {
        try {

            const { chatId, senderId } = req.query;
            const allChatMessages = await ChatMessages.find({ chatId });

            ResponseHandler(200, 'Success', "All chat messages send successfully!!!", res, allChatMessages);

        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }
    },

    PendingFriendRequestSender: async (req,res) => {

        try {

            const { senderId, recieverId, senderName, senderAvatar } = req.query;
            const addRequest = new PendingFriendRequest({ senderId, recieverId, senderName, senderAvatar });
    
            await PendingFriendRequest.insertMany([addRequest]);

            ResponseHandler(200, 'Success', "Friend request send successfully!!!", res);

        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }

    },

    PendingFriendRequestReciever: async (req,res) => {

        try {

            const { graberId } = req.query;
            const pendingFriendRequestData = await PendingFriendRequest.find({ recieverId: { $eq: graberId } });

            ResponseHandler(200, 'Success', "You've pending request successfully!!!", res, pendingFriendRequestData);
    
        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }

    },

    PendingFriendRequestOver: async (req,res) => {

        try {

            const { sId, rId } = req.query;
            await PendingFriendRequest.deleteOne({ recieverId: { $in: rId } , senderId: { $in: sId } });

            ResponseHandler(200, 'Success', "Friend request deleted successfully!!!", res);
    
        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }

    },

    FriendRequestAccepted: async (req,res) => {

        try {

            const { senderId, senderName, senderAvatar, recieverId, recieverName, recieverAvatar } = req.body;
            const addRequest = new AcceptedFriendRequest({ senderId, senderName, senderAvatar, recieverId, recieverName, recieverAvatar });
            await AcceptedFriendRequest.insertMany([addRequest]);

            ResponseHandler(200, 'Success', "Friend request accepted successfully!!!", res);
    
        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }
    },

    GetAllFriends: async (req,res) => {

        try {

            const { id } = req.query;
            const allFriends = await AcceptedFriendRequest.find({ $or: [{ recieverId: { $in: id } }, { senderId: { $in: id } }] });

            ResponseHandler(200, 'Success', "All friends grab successfully!!!", res, allFriends);
    
        } catch (e) {
            ResponseHandler(200, 'Failed', "Internal sever error!!!", res);
        }
    
    }

}