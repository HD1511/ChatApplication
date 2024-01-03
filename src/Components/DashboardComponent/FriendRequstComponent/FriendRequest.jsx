import React, { useContext, useEffect, useState } from 'react';

import '../FriendRequstComponent/FriendRequest.css';

import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { UserDetailsContext } from '../Dashboard';

const FriendRequest = ({ isClicked }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [statusSetter, setStatusSetter] = useState(false);
    const { userDetails, socketSetter } = useContext(UserDetailsContext);

    useEffect(() => {

        const collectFriendRequestData = async () => {

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestReciever?graberId=${userDetails?._id}`);

            setPendingRequests(data.pendingFriendRequestData);
        }

        socketSetter.on('pendingRequests', async () => {
            collectFriendRequestData();
        })

        collectFriendRequestData();

    }, [statusSetter]);

    const judgePendingRequest = async (ele, status) => {

        if (status) {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/friendRequestAccepted`, {
                senderId: ele.senderId,
                senderName: ele.senderName,
                senderAvatar: ele.senderAvatar,
                recieverId: userDetails._id,
                recieverName: userDetails.Username,
                recieverAvatar: userDetails.Avatar
            });

            console.log(ele.senderId);

            socketSetter.emit('Update-user-list', ele.senderId);
        }

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestOver?sId=${ele.senderId}&rId=${userDetails._id}`);
        
        setStatusSetter(!statusSetter);
    }

    return (
        <>
            <div className='friendRequestCheck'>
                <div className='backIconWrapper'>
                    <ArrowBackIcon className='backIcon' onClick={() => isClicked(false)} />
                    <input type='text' placeholder="Search Friend" className='searchFriend' />
                    <SearchIcon className='searchIcon' />
                </div>
                {pendingRequests?.map((ele, ind) => {
                    return (
                        <div className='requests' key={ind}>
                            <div className='img' style={{ backgroundImage: `url(/src/assets/${ele?.senderAvatar})` }}></div>
                            <div className='name'>{ele?.senderName}</div>
                            <div className='icons'>
                                <div onClick={() => judgePendingRequest(ele, false)}><CloseIcon className='closeIcon' /></div>
                                <div onClick={() => judgePendingRequest(ele, true)} ><DoneIcon className='doneIcon' /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default FriendRequest;