const express = require('express');
const router = express.Router();

const logic = require('../Controller/Controller.js');

router.route('/login').post(logic.Login);

router.route('/authentication').get(logic.Authentication);

router.route('/signUp').post(logic.SignUp);

router.route('/logout').get(logic.Logout);

router.route('/searchUser').get(logic.Authentication,logic.SearchUser);

router.route('/chatMessages').post(logic.Authentication,logic.ChatMessages).get(logic.Authentication,logic.GetAllChatMessages);

router.route('/pendingFriendRequestSender').get(logic.Authentication,logic.PendingFriendRequestSender);

router.route('/pendingFriendRequestReciever').get(logic.Authentication,logic.PendingFriendRequestReciever);

router.route('/pendingFriendRequestOver').get(logic.Authentication,logic.PendingFriendRequestOver);

router.route('/friendRequestAccepted').post(logic.Authentication,logic.FriendRequestAccepted);

router.route('/getAllFriends').get(logic.Authentication,logic.GetAllFriends);

module.exports = router;