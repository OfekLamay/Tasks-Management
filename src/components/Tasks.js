import React from 'react'
import TaskPreview from './TaskPreview'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tasks = (props) => {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Server interaction functions ----------------------------------------------------
  
    // const showAllTasks = () => {
    //   fetch('/api/tasks')
    //   .then(response => response.json())
    //   .then(data => setTasks(data))
    // }
  
    const newShowAllTasks = async () => {
      await fetch('/api/new-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.currentUser })
      })
      .then(response => response.json())
      .then(data => setTasks(data))
      setIsLoading(false)
  
    }
  
    const checkLogIn = () => {
      if (props.currentUser === "NotLoggedIn")
      {
        window.alert("Log in first!")
        navigate('/')
      }
    }

    const showUserTasks = () => {
  
      fetch('/api/user-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.currentUser })
      })
      .then(response => response.json())
      .then(data => setTasks(data))
    }

    // const tasksHistory = () => {
    //   fetch('/api/tasks-history')
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.length === 0)
    //       alert("No History")
    //     else
    //       setTasks(data)
    //   })
    // }
    
    const newTasksHistory = () => {
  
      fetch('/api/new-tasks-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.currentUser })
      })
      .then(response => response.json())
      .then(data => {
        if (data.length === 0)
          alert("No History")
        else
          setTasks(data)
      })
  
    }

    // Frontend interactions functions --------------------------------------------------
  
    useEffect(()=>{
      checkLogIn();
      // showAllTasks()
      newShowAllTasks();
    },[])
  
    const newTask = () => {
      navigate('/newTask');
    }

    // This is a better way to remove the task after ending it - try it
    const removeTaskFromState = (id) => {
      // This is a VERY stupid way to remove the task after ending it. The only thing
      // needed is to remove the task from the tasks array, no need to iterate over 
      // all the tasks
      setTasks(tasks => tasks.filter(task => task.id !== id));
    }
  
    const logout = () => {
      alert("Logging out...")
      // Not doing anything to the user?
      navigate('/');
    }
  
    return (
      <div>
  
      <h2>Hello {props.currentUser}!</h2>
      <div className='flexboxContainerLine'>
        <div className='flexboxContainerButtons'>
          <div className='optionDiv' onClick={showUserTasks}>Show my tasks</div>
          <div className='optionDiv' onClick={newShowAllTasks}>Show all tasks</div>
          <div className='optionDiv' onClick={newTask}>New task</div>
          <div className='optionDiv' onClick={newTasksHistory}>Tasks history</div>
          <div className='optionDiv' onClick={logout}>Exit</div>
        </div>
  
        <div className='flexboxContainerTasks'>
          {tasks.map((task) => {
            return <TaskPreview key={`task-${task.id}`} updateTasks={removeTaskFromState} taskData = {task} /> })}  
          {isLoading ? <div className='tasksMessage'>Loading tasks...</div> : null}
          {tasks.length === 0 && !isLoading ? <div id='noTasksLeft' className='tasksMessage'>ALL TASKS ARE DONE!</div> :null}
        </div>
      </div>
      </div>
    )
}

export default Tasks
