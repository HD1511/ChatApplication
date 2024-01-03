import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import { UserContext } from '../App/App.jsx';
import '../DashboardComponent/Dashboard.css';

import TopBar from './TopBarComponent/TopBar.jsx';
import ChatsBar from './ChatsBarComponent/ChatsBar.jsx';
import ChatMessages from './ChatMessagesComponent/ChatMessages.jsx';
import Footer from './FooterComponent/Footer.jsx';
import SearchUser from './SearchUserComponent/SearchUser.jsx';

import io from 'socket.io-client';

let socket;

const UserDetailsContext = createContext();

const Dashboard = () => {
    const [searchUser, setSearchUser] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [socketSetter, setSocketSetter] = useState();
    const [showChats, setShowChats] = useState();
    const { isLogIn, setIsLogIn } = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuthenticatedOrNot = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/authentication`, { withCredentials: true, headers: { Accept: 'application/json' } });
            
            setUserDetails(data.UserDetails);
            
            if (data.Status === 'Success') {
                
                socket = io(import.meta.env.VITE_BACKEND_URI);

                socket.emit('Update_UserList', data.UserDetails._id);
                setSocketSetter(socket);

                if (isLogIn) {
                    toast.success("Log in successfully!!!", {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    setIsLogIn(false);
                }
            } else {
                navigate('/');
            }
        }

        checkAuthenticatedOrNot();

    }, [setUserDetails]);

    const onSearchUserClick = (value) => {
        setSearchUser(value);
    }

    const openChats = (ele) => {
        setShowChats(ele);
    }

    return (
        <>
            <Toaster />
            <div className='wrapper'>
                <TopBar />
                <div style={{ display: 'flex' }}>
                    {
                        searchUser ?
                            <UserDetailsContext.Provider value={{ userDetails, socketSetter }}>
                                <SearchUser isClicked={onSearchUserClick} />
                            </UserDetailsContext.Provider> :
                            <UserDetailsContext.Provider value={{ userDetails, socketSetter }}>
                                <ChatsBar onClickToOpenChats={openChats} />
                                <ChatMessages showClickedChat={showChats} />
                            </UserDetailsContext.Provider>
                    }
                </div>
                <UserDetailsContext.Provider value={userDetails}>
                    <Footer isClicked={onSearchUserClick} />
                </UserDetailsContext.Provider>
            </div>
        </>
    )
}

export default Dashboard;
export { UserDetailsContext };
