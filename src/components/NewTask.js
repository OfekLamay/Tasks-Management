import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SelectOptions from './SelectOptions';

const NewTask = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.username);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the server
        fetch('/api/users-only')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const createTask = () => {
        let taskName = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let userRelated = document.getElementById('selectUser').value;

        if (taskName === "" || userRelated === "") {
            alert("Please insert valid task name and a valid user to relate the task to");
            return;
        }

        fetch('/api/add-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tName: taskName, tDes: description, tUserRelated: userRelated, tUserCreator: currentUser })
        })
        .then(response => response.json())
        .then(res => {
            if(res.isAdded) {
                alert(res.message);
                navigate('/tasks');
            } else {
                alert(res.message)
            }
        })
    }

    const goBack = () => {
        navigate('/tasks')
    }

    return (
        <div className="newtask-bg">
            <div className="newtask-card">
                <h2 style={{textAlign: 'center'}}>Add New Task</h2>
                <div className='flexboxContainerNewTask'>
                    <button onClick={goBack} className='clickbtn'>Back</button>
                    <input id='name' type="text" className='inputLabel' placeholder='Task name' />
                    <textarea id='description' type="text" className='descriptionInputLabel' placeholder='Task description'/>
                    <SelectOptions users={users} />
                    <button onClick={createTask} className='clickbtn'>Create</button>
                </div>
            </div>
        </div>
    )
}

export default NewTask
