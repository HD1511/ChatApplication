import React, { useContext, useEffect, useState } from 'react';

import '../SearchUserComponent/SearchUser.css';
import { UserDetailsContext } from '../Dashboard.jsx';

import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import { Button } from 'primereact/button';
import { pendingFriendRequestSender, searchUser } from '../../../api/apiHandler.js';

const userNotSelectedToShowProfile = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem'
}

const SearchUser = ({ isClicked }) => {
    const [usernameToFindUserInput, setUernameToFindUserInput] = useState(undefined);
    const [allDataOfUser, setAllDataOfUser] = useState([]);
    const [clickUserData, setClickUserData] = useState();
    const {userDetails , socketSetter} = useContext(UserDetailsContext);

    useEffect(() => {

        const searchUsernameToFindUserInDB = async () => {

            const { data } = await searchUser(usernameToFindUserInput);
            setAllDataOfUser(data.Data);
            
        }

        searchUsernameToFindUserInDB();

    }, [usernameToFindUserInput]);

    const userFinderClick = (e, user) => {
        setClickUserData(user); 
    }

    const addFriend = async () => {
        
        const [senderId,recieverId,senderName,senderAvatar] = [userDetails?._id,clickUserData._id,userDetails?.Username,userDetails?.Avatar];

        const {data} = await pendingFriendRequestSender(senderId,recieverId,senderName,senderAvatar);

        socketSetter.emit('Pending-request' , {senderId,recieverId,senderName,senderAvatar});
    }

    return (
        <>
            <div className='searchUser'>
                <div className='inputWrapper'>
                    <ArrowBackIcon className='backFromSearchIcon' onClick={() => isClicked(false)} />
                    <input type="text" className='searchUserInput' placeholder='Search User' onChange={(e) => setUernameToFindUserInput(e.target.value ? e.target.value : undefined)} />
                    <SearchIcon className='searchUserIcon' />
                </div>
                <div className='allFindedUsers'>
                    <div className='chats'>
                        {allDataOfUser?.map((ele, ind) => {
                            return (
                                <div className='details' key={ind} onClick={e => userFinderClick(e, ele)}>
                                    <div className='img' style={{ backgroundImage: `url('/src/assets/${ele?.Avatar}')` }}></div>
                                    <div className='name'>{ele?.Username}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {!clickUserData ?
                    <div className='clickUserProfile' style={userNotSelectedToShowProfile}>
                        Search and click on profile to show.
                    </div> :
                    <div className='clickUserProfile'>
                        <CloseIcon className='closeIcon' onClick={() => setClickUserData()}/> 
                        <div className='avatarShower' style={{ backgroundImage: `url(/src/assets/${clickUserData.Avatar})` }}></div>
                        <div className='usernameShower'> {clickUserData.Username} </div>
                        <Button className='addFriend' label="Add Friend" icon="pi pi-plus" onClick={addFriend} raised />
                    </div>
                }
            </div>
        </>
    )
}

export default SearchUser;