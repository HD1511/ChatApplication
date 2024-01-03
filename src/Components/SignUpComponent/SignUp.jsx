import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Toaster } from 'react-hot-toast';
import axios from 'axios';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

import { Button } from 'primereact/button';

import { UserContext } from '../App/App.jsx';
import { ToastSuccess, ToastFailed } from '../../utils/toast.js';
import { signUp } from '../../api/apiHandler.js';
import '../SignUpComponent/SignUp.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import validator from 'validator';

import defaultImg from '../../assets/default.jpg';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';

const imgArr = [defaultImg, image1, image2, image3, image4, image5];

const SignUp = () => {
  const [index, setIndex] = useState(0);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [SelectValue, setSelectValue] = useState(defaultImg);
  const { setIsSignUp } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    setSelectValue(imgArr[selectedIndex]);
  };

  const signUpSubmit = async () => {

    if (!validator.isEmail(Email)) {
      ToastFailed("Enter a valid email!!!");
      return;
    }

    if (!validator.isStrongPassword(Password)) {
      ToastFailed("Enter a valid password!!!");
      return;
    }

    try {

      const { data } = await signUp(Email,Username,Password,SelectValue.split('/')[3]);

      if (data.Status === 'Failed') {
        ToastFailed("User already present!!!");
      } else {
        setIsSignUp(true);
        navigate('/');
      }

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <>
      <Toaster />
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className='SignUpForm'>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={defaultImg} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={image1} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={image2} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={image3} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={image4} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
          <Carousel.Item style={{ textAlign: 'center' }}>
            <img src={image5} style={{ height: "100px", width: "100px", borderRadius: '50%' }} />
          </Carousel.Item>
        </Carousel>
        <label htmlFor="Username">Username</label>
        <input type="text" placeholder="Username" id="Username" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="Email">Email</label>
        <input type="text" placeholder="Email" id="Email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <Button label="Sign Up" className="p-ripple btnForSignUp" raised rounded onClick={signUpSubmit}></Button>
        <div style={{ textAlign: 'center' }}>
          Already have an account?
          <Link to='/' style={{ marginLeft: '5px' }}>Sign In</Link>
        </div>

      </div>

    </>
  )
}

export default SignUp;