import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

import { Button } from 'primereact/button';

import { UserContext } from '../App/App.jsx';
import '../LoginComponent/Login.css';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const { isSignUp, setIsSignUp, setIsLogIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignUp) {
            toast.success("Sign up successfully!!!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setIsSignUp(false);
        }
    }, []);

    const signInSubmit = async () => {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/login`, {
            Email,
            Password
        }, { withCredentials: true, headers: { Accept: 'application/json' } });

        if (data.Status === 'Not Found') {
            toast.error('Data Not Found!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } else if (data.Status === 'Failed') {
            toast.error("Invalid credentials!!!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            setIsLogIn(true);
            navigate('/Dashboard');
        }

    }

    return (
        <>
            <Toaster />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='LoginForm'>
                <h3>Login Here</h3>
                <label htmlFor="Email">Email</label>
                <input type="text" placeholder="Email" id="Email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                <div style={{ alignItems: 'flex-end',marginTop:'10px' }}>
                    Forgot Password?
                </div>
                <Button label="Log In" className="p-ripple btnForSignIn" raised rounded onClick={signInSubmit}></Button>
                <div style={{textAlign:'center'}}>
                    Don't have an account? 
                    <Link to='/Sign-up' style={{marginLeft:'5px',marginTop:'5px'}}>Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default Login;