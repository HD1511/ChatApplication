import React from 'react';
import { useNavigate } from "react-router-dom";

import { Logout } from '../../../api/apiHandler.js';

import '../TopBarComponent/TopBar.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TopBar = () => {
    const navigate = useNavigate();

    const logoutUser = async (e, navigate) => {

        try {

            const { data } = await Logout(); 
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