import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NewTask() {

    const navigate = useNavigate()

    const createTask = ()=> {

        let taskName = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let userRelated = document.getElementById('userRelated').value;

        if (taskName === "" || userRelated === "")
        {
            alert("Please insert valid task name and a valid user to relate the task to");
            return;
        }
  
        fetch('/api/add-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tName: taskName, tDes: description, tUserRelated: userRelated })
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

    const goBack = ()=> {
        navigate('/tasks')
    }

  return (
    <div>
        <h2>Add New Task</h2>
        <br />
        <div className='flexboxContainerNewTask'>
            <br/>
            <button onClick={goBack} className='clickbtn'>Back</button>
            <br/> <br/>
            <input id='name' type="text" className='inputLabel' placeholder='Task name' />
            <br/> <br/>
            <textarea id='description' type="text" className='descriptionInputLabel' placeholder='Task description'/>
            <br/> <br/>
            <input id='userRelated' type="text" className='inputLabel' placeholder='User related to' />
            <br/> <br/>
            <button onClick={createTask} className='clickbtn'>Create</button>
        </div>
    </div>
  )
}
