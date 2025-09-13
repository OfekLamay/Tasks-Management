import React from 'react'
import TaskPreview from './TaskPreview'
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { setTasks, removeTask } from '../redux/tasksSlice';

const Tasks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.username);
    const tasks = useSelector(state => state.tasks);

    const [isLoading, setIsLoading] = useState(true)

    // Server interaction functions ----------------------------------------------------
    
    const showAllTasks = useCallback(async () => {
      const response = await fetch('/api/new-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser })
      });
      const data = await response.json();
      dispatch(setTasks(data));
      setIsLoading(false);
    }, [currentUser, dispatch]);
  
    const checkLogIn = useCallback(() => {
      if (currentUser === "NotLoggedIn")
      {
        window.alert("Log in first!")
        navigate('/')
      }
    }, [currentUser, navigate]);

    const showUserTasks = async () => {
      await fetch('/api/user-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser })
      })
      .then(response => response.json())
      .then(data => dispatch(setTasks(data)))
    }

    const newTasksHistory = async () => {
      await fetch('/api/new-tasks-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser })
      })
      .then(response => response.json())
      .then(data => {
        if (data.length === 0)
          alert("No History")
        else
          dispatch(setTasks(data))
      })
    }

    // Frontend interactions functions --------------------------------------------------
  
    useEffect(()=>{
      checkLogIn();
      showAllTasks()
    }, [checkLogIn, showAllTasks])
  
    const newTask = () => {
      navigate('/newTask');
    }

    const removeTaskFromState = (id) => {
      dispatch(removeTask(id));
    }
  
    const logout = () => {
      alert("Logging out...")
      navigate('/');
    }
  
    return (
      <div className="tasks-bg">
        <div className="tasks-card">
          <h2 style={{textAlign: 'center'}}>Hello {currentUser}!</h2>
          <div className='flexboxContainerLine'>
            <div className='flexboxContainerButtons'>
              <div className='optionDiv' onClick={showUserTasks}>Show my tasks</div>
              <div className='optionDiv' onClick={showAllTasks}>Show all tasks</div>
              <div className='optionDiv' onClick={newTask}>New task</div>
              <div className='optionDiv' onClick={newTasksHistory}>Tasks history</div>
              <div className='optionDiv' onClick={logout}>Exit</div>
            </div>
            <div className='flexboxContainerTasks'>
              {tasks.map((task) => (
                <TaskPreview key={`task-${task.id}`} updateTasks={removeTaskFromState} taskData={task} />
              ))}
              {isLoading ? <div className='tasksMessage'>Loading tasks...</div> : null}
              {tasks.length === 0 && !isLoading ? <div id='noTasksLeft' className='tasksMessage'>ALL TASKS ARE DONE!</div> :null}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Tasks
