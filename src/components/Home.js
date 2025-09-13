import React from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Server interactions functions ----------------------------------------------------

  const checkLogin = async (username, password) => {
    // Request the server to log in

    await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uName: username, uPass: password })
    })
    .then(response => response.json())
    .then(res => {
      if(res.isLogin) {
        dispatch(setUser(username));
        alert(res.message);
        navigate('/tasks');
      } else {
        alert(res.message)
      }
    })

  }

  // Frontend interactions functions --------------------------------------------------

  const logIn = () => {
    let uName = document.getElementById('username').value;
    let uPassword = document.getElementById('password').value;
    checkLogin(uName, uPassword)
  }

  // const addUser = () => {
  //   let uName = document.getElementById('username').value;
  //   let uPassword = document.getElementById('password').value;

  //   if (uName != "" && uPassword != "")
  //     props.addUser(uName, uPassword)
  //   else
  //     alert("Insert a proper username and password")
  // }

  return (
    <div className="home-bg">
      <div className="home-card">
        <h2>👋 Welcome to Tasks Management</h2>
        <div className='home-form'>
          <input id='username' type="text" className='inputLabel' placeholder='User name' />
          <input id='password' type="password" className='inputLabel' placeholder='Password' />
          <button onClick={logIn} className='clickbtn home-btn'>Log In</button>
        </div>
      </div>
    </div>
  )
}

export default Home
