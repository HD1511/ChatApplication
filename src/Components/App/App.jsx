import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../LoginComponent/Login.jsx';
import SignUp from '../SignUpComponent/SignUp.jsx';
import Dashboard from '../DashboardComponent/Dashboard.jsx';

import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

const UserContext = createContext();

const App = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <UserContext.Provider value={{ isSignUp, setIsSignUp, setIsLogIn }}>
              <Login />
            </UserContext.Provider>
          } />
          <Route path='/Sign-up' element={
            <UserContext.Provider value={{ setIsSignUp }}>
              <SignUp />
            </UserContext.Provider>
          } />
          <Route path='/Dashboard' element={
            <UserContext.Provider value={{ isLogIn, setIsLogIn }}>
              <Dashboard />
            </UserContext.Provider>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
export { UserContext };