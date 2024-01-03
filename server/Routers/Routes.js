const express = require('express');
const router = express.Router();

const logic = require('../Controller/Controller.js');

router.route('/login').post(logic.Login);

router.route('/authentication').get(logic.Authentication);

router.route('/signUp').post(logic.SignUp);

router.route('/logout').get(logic.Logout);

router.route('/searchUser').get(logic.SearchUser);

router.route('/chatMessages').post(logic.ChatMessages).get(logic.GetAllChatMessages);

router.route('/pendingFriendRequestSender').get(logic.PendingFriendRequestSender);

router.route('/pendingFriendRequestReciever').get(logic.PendingFriendRequestReciever);

router.route('/pendingFriendRequestOver').get(logic.PendingFriendRequestOver);

router.route('/friendRequestAccepted').post(logic.FriendRequestAccepted);

router.route('/getAllFriends').get(logic.GetAllFriends);

module.exports = router;