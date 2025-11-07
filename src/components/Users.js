import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import UserPreview from './UserPreview';

const Users = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.username);
  const role = useSelector(state => state.user.role);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    // Admin sees all users (without passwords) via /api/users-only
    // Others see only their team via /api/team-users-only
    if (role === 'admin') {
      const res = await fetch('/api/users-only');
      const data = await res.json();
      setUsers(data || []);
    } else {
      const res = await fetch('/api/team-users-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser })
      });
      const data = await res.json();
      setUsers(data || []);
    }
    setIsLoading(false);
  }, [currentUser, role]);

  const ranOnce = useRef(false);
  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    if (currentUser === 'NotLoggedIn') {
      window.alert('Log in first!');
      navigate('/');
      return;
    }
    loadUsers();
  }, [currentUser, navigate, loadUsers]);

  return (
    <div className="users-bg">
      <div className="users-card">
        <NavBar />
        <h2 className="users-title">Users</h2>
        <div className="flexboxContainerUsers">
          {users.map(u => (
            <UserPreview key={`user-${u.username}`} userData={u} />
          ))}
          {isLoading ? <div className='usersMessage'>Loading users...</div> : null}
          {!isLoading && users.length === 0 ? <div className='usersMessage'>No users found</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Users;
