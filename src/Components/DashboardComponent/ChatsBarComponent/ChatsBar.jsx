import React, { useContext, useEffect, useState } from 'react';

import '../ChatsBarComponent/ChatsBar.css';
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import { UserDetailsContext } from '../Dashboard.jsx';
import FriendRequest from '../FriendRequstComponent/FriendRequest.jsx';

const ChatsBar = ({ onClickToOpenChats }) => {
    const [friendRequestClick, setFriendrequestClick] = useState(false);
    const [pendingRequestCounter, setPendingRequestsCounter] = useState(0);
    const [allFriendsChats, setAllFriendsChats] = useState([]);
    const { userDetails, socketSetter } = useContext(UserDetailsContext);

    useEffect(() => {

        const collectFriendRequestData = async () => {

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pendingFriendRequestReciever?graberId=${userDetails?._id}`);

            setPendingRequestsCounter(data.pendingFriendRequestData.length);
        }

        const collectAllFriends = async () => {

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/getAllFriends?id=${userDetails?._id}`);

            setAllFriendsChats(data.allFriends);
        }

        socketSetter?.on('pendingRequests', async () => {
            collectFriendRequestData();
        })

        socketSetter?.on('updateUserList' , async () => {
            collectAllFriends();
        })


        collectFriendRequestData();
        collectAllFriends();

    }, [setPendingRequestsCounter, userDetails, friendRequestClick, setAllFriendsChats]);

    return (
        <>
            <div className='chatBar'>
                {!friendRequestClick ?
                    <>
                        <div className='inputWrapper'>
                            <input type="text" className='chatInputs' placeholder='Search Friend' />
                            <SearchIcon className='searchIcon' />
                            <PersonIcon className='addFriendIcon' style={{ fontSize: '2rem' }} onClick={() => setFriendrequestClick(true)} />
                            <span className='friendCounter'>{pendingRequestCounter}</span>
                        </div>
                        <div className="chatsWithFriends">
                            {allFriendsChats.map((ele, ind) => {
                                return (
                                    <div className='chats' key={ind} onClick={() => onClickToOpenChats(ele)}>
                                        <div className='img' style={{ backgroundImage: `url('/src/assets/${ele.senderAvatar === userDetails.Avatar ? ele.recieverAvatar : ele.senderAvatar}')`}}></div>
                                        <div className='messageWrapper'>
                                            <div className='name'>{ele.senderName === userDetails.Username ? ele.recieverName : ele.senderName}</div>
                                            <div className='messages'>Hello</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </> :
                    <FriendRequest isClicked={setFriendrequestClick} />
                }
            </div>
        </>
    )
}

export default ChatsBar;