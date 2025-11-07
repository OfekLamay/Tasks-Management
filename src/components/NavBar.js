import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/userSlice';
import { setTasks } from '../redux/tasksSlice';

const NavBar = ({
  onShowMyTasks,
  onShowAllTasks,
  onNewTask,
  onHistory,
  onUsers
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(s => s.user.role);
  const currentUser = useSelector(s => s.user.username);

  // Fallback handlers if not passed in (basic navigation only)
  const showMyTasks = onShowMyTasks || (() => navigate('/tasks'));
  const showAllTasks = onShowAllTasks || (() => navigate('/tasks'));
  const newTask = onNewTask || (() => navigate('/newTask'));
  const history = onHistory || (() => navigate('/tasks'));
  const users = onUsers || (() => navigate('/users'));

  const handleLogout = () => {
    dispatch(setTasks([]));
    dispatch(logoutAction());
    navigate('/');
  };

  // Design-only change: revert to Tasks sidebar styles
  if (currentUser === 'NotLoggedIn') return null;

  return (
    <div className='flexboxContainerButtons'>
      <div className='optionDiv' onClick={showMyTasks}>Show my tasks</div>
      <div className='optionDiv' onClick={showAllTasks}>Show all tasks</div>
      <div className='optionDiv' onClick={newTask}>New task</div>
      <div className='optionDiv' onClick={history}>Tasks history</div>
      {['manager','admin'].includes(role) && (
        <div className='optionDiv' onClick={users}>Users</div>
      )}
      <div className='optionDiv' onClick={handleLogout}>Exit</div>
    </div>
  );
};

export default NavBar;
