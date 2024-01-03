import axios from "axios";

export const signUp = async (Email, Username, Password, Avatar) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/signUp`, {
        Email,
        Username,
        Password,
        Avatar
    })
}

export const logIn = async (Email, Password) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/login`, {
        Email,
        Password
    }, { withCredentials: true, headers: { Accept: 'application/json' } });
}

export const authentication = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/authentication`,
        {
            withCredentials: true, headers: { Accept: 'application/json' }
        });
}

export const Logout = async () => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/logout`,
        {
            withCredentials: true, headers: { Accept: 'application/json' }
        });
}

export const searchUser = async (usernameToFindUserInput) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/searchUser?usernameToFindUserInput=${usernameToFindUserInput}`);
}

export const pendingFriendRequestSender = async (senderId,recieverId,senderName,senderAvatar) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestSender?senderId=${senderId}&recieverId=${recieverId}&senderName=${senderName}&senderAvatar=${senderAvatar}`);
}

export const friendRequestAccepted = async (ele,userDetails) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/friendRequestAccepted`, {
        senderId: ele.senderId,
        senderName: ele.senderName,
        senderAvatar: ele.senderAvatar,
        recieverId: userDetails._id,
        recieverName: userDetails.Username,
        recieverAvatar: userDetails.Avatar
    });
}

export const pendingFriendRequestOver = async (ele,userDetails) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestOver?sId=${ele.senderId}&rId=${userDetails._id}`);
}

export const postChatMessages = async (showClickedChat,userDetails) => {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/chatMessages`, {
        chatId: showClickedChat._id,
        senderId: userDetails._id,
        Message: message
    });
}

export const getChatMessages = async (showClickedChat) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/chatMessages?chatId=${showClickedChat?._id}`);
}

export const getAllFriends = async (userDetails) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getAllFriends?id=${userDetails?._id}`);
}

export const pendingFriendRequestReciever = async (userDetails) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestReciever?graberId=${userDetails?._id}`);
}