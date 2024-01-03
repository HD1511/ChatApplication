import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import '../TopBarComponent/TopBar.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TopBar = () => {
    const navigate = useNavigate();

    const logoutUser = async (e, navigate) => {

        try {

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/logout`
                , { withCredentials: true, headers: { Accept: 'application/json' } });
            console.log(data);
            navigate('/');

            window.location.reload();

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <div className='topBar'>
                <ul>
                    <li className='chatAppName'>ChatApp</li>
                    <li className='btn'><button onClick={(e) => logoutUser(e, navigate)}><ExitToAppIcon /></button></li>
                </ul>
            </div>
        </>
    )
}

export default TopBar;