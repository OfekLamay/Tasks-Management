import React from 'react'
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {

    const navigate = useNavigate()
    // const [first, setfirst] = useState(second)

    const checkLogin = (username, password) => {
      // Request the server to log in
  
      fetch('/Tasks-Management/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json'},
          body: JSON.stringify({ uName: username, uPass: password })
      })
      .then(response => response.json())
      .then(res => {
        if(res.isLogin) {
          props.updateUser(username)
          alert(res.message);
          navigate('/tasks');
        } else {
          alert(res.message)
        }
      })
  
    }

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
    <div>
        <div className='flexboxContainer'>
            <br/> <br/>
            <input id='username' type="text" className='inputLabel' placeholder='User name' />
            <br/> <br/>
            <input id='password' type="password" className='inputLabel' placeholder='Password' />
            <br/> <br/>
            <button onClick={logIn} className='clickbtn'>Log In</button>
            {/* <br/> <br/>
            <button onClick={addUser} className='clickbtn'>Add User</button> */}
        </div>
    </div>
  )
}
