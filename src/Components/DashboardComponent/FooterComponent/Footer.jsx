import React, { useContext, useEffect, useState } from 'react';

import '../FooterComponent/Footer.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Footer = ({ isClicked }) => {

    return (
        <>
            <div className='Footer'>
                <div onClick={() => isClicked(true)}> <PersonSearchIcon className='searchUserIcon' /></div>
                <AccountCircleIcon className='profileIcon' />
            </div>
        </>
    )
}

export default Footer;

