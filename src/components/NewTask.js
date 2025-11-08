import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SelectOptions from './SelectOptions';

const NewTask = () => {
    const navigate = useNavigate();
    const { username: currentUser } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const ranOnceRef = useRef(false);

    // Guard + fetch team users (once)
    useEffect(() => {
        if (ranOnceRef.current) return;
        ranOnceRef.current = true;

        if (currentUser === 'NotLoggedIn') {
            window.alert('Log in first!');
            navigate('/');
            return;
        }

        fetch('/api/team-users-only', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser })
        })
        .then(response => response.json())
        .then(data => setUsers(data));
    }, [currentUser, navigate]);

    const createTask = () => {
        if (currentUser === 'NotLoggedIn') {
            window.alert('Log in first!');
            navigate('/');
            return;
        }

        const taskName = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const userRelated = document.getElementById('selectUser').value;

        if (!taskName || !userRelated) {
            alert('Please insert valid task name and a valid user');
            return;
        }

        fetch('/api/add-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tName: taskName,
                tDes: description,
                tUserRelated: userRelated,
                tUserCreator: currentUser
            })
        })
        .then(response => response.json())
        .then(res => {
            alert(res.message);
            if (res.isAdded) navigate('/tasks');
        });
    };

    const goBack = () => navigate('/tasks');

    return (
        <div className="newtask-bg">
          <div className="newtask-card">
            <h2 style={{textAlign: 'center'}}>Add New Task</h2>
            <div className='flexboxContainerNewTask'>
              <button onClick={goBack} className='clickbtn'>Back</button>
              <input id='name' type="text" className='inputLabel' placeholder='Task name' />
              <textarea id='description' className='descriptionInputLabel' placeholder='Task description' />
              <SelectOptions users={users} />
              <button onClick={createTask} className='clickbtn'>Create</button>
            </div>
          </div>
        </div>
    )
};

export default NewTask
