import React, { useContext, useEffect, useState } from 'react';

import '../FriendRequstComponent/FriendRequest.css';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { UserDetailsContext } from '../Dashboard';
import { friendRequestAccepted, pendingFriendRequestOver, pendingFriendRequestReciever } from '../../../api/apiHandler.js';

const FriendRequest = ({ isClicked }) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [statusSetter, setStatusSetter] = useState(false);
    const { userDetails, socketSetter } = useContext(UserDetailsContext);

    useEffect(() => {

        const collectFriendRequestData = async () => {

            const { data } = await pendingFriendRequestReciever(userDetails);
            setPendingRequests(data.Data);
            
        }

        socketSetter.on('pendingRequests', async () => {
            collectFriendRequestData();
        });

        collectFriendRequestData();

        return () => {
            socketSetter?.off('pendingRequests');
        }

    }, [statusSetter]);

    const judgePendingRequest = async (ele, status) => {

        if (status) {

            const { data } = await friendRequestAccepted(ele,userDetails);
            socketSetter.emit('Update-user-list', ele.senderId);

        }

        const {data} = await pendingFriendRequestOver(ele,userDetails);
        
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