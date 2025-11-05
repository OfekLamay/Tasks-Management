import React from 'react'
import TaskPreview from './TaskPreview'
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { setTasks, removeTask } from '../redux/tasksSlice';
import { logout as logoutAction } from '../redux/userSlice';
import TimedModal from './TimedModal'; // <-- add

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user.username);
  const tasks = useSelector(state => state.tasks);
  const role = useSelector(state => state.user.role);

  const [isLoading, setIsLoading] = useState(true)
  const [noHistoryOpen, setNoHistoryOpen] = useState(false) // <-- add

  // Server interaction functions ----------------------------------------------------

  const showAllTasks = useCallback(async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser })
    });
    const data = await response.json();
    dispatch(setTasks(data));
    setIsLoading(false);
  }, [currentUser, dispatch]);

  // Run once in dev despite StrictMode double-invoking effects
  const ranOnceRef = useRef(false);
  useEffect(() => {
    if (ranOnceRef.current) return;   // <-- prevents double execution in dev
    ranOnceRef.current = true;

    if (currentUser === 'NotLoggedIn') {
      window.alert('Log in first!');
      navigate('/');
      return;
    }
    showAllTasks();
  }, [currentUser, navigate, showAllTasks]);

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
    await fetch('/api/tasks-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser })
    })
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) setNoHistoryOpen(true);  // <-- open modal
      else dispatch(setTasks(data))
    })
  }

  // Frontend interaction functions ----------------------------------------------------

  const newTask = () => navigate('/newTask');

  const removeTaskFromState = (id) => dispatch(removeTask(id));

  const handleLogout = () => {                  
    dispatch(setTasks([]));
    dispatch(logoutAction());
    alert('Logging out...');
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
            <div className='optionDiv' onClick={handleLogout}>Exit</div>
            {['manager','admin'].includes(role) && (
              <div className='optionDiv' onClick={() => navigate('/users')}>Users</div>
            )}
          </div>
          <div className='flexboxContainerTasks'>
            {tasks.map((task) => (
              <TaskPreview key={`task-${task.id}`} updateTasks={removeTaskFromState} taskData={task} />
            ))}
            {isLoading ? <div className='tasksMessage'>Loading tasks...</div> : null}
            {tasks.length === 0 && !isLoading ? <div id='noTasksLeft' className='tasksMessage'>ALL TASKS ARE DONE!</div> : null}
          </div>
        </div>
      </div>

      {/* No history modal */}
      <TimedModal
        open={noHistoryOpen}
        onClose={() => setNoHistoryOpen(false)}
        title="No History"
        message="No tasks history found."
        durationMs={10000}
      />
    </div>
  )
}

export default Tasks
