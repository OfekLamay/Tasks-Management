import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = ({ show, user, close }) => {
  // Get viewer info (must be before any early return)
  const { username: currentUser, role: currentRole, teamNumber: currentTeam } = useSelector(state => state.user);

  if (!show) return null;

  const canManage =
    currentRole === 'admin' ||
    (currentRole === 'manager' && user.teamNumber === currentTeam);

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-card">
        <button className="user-modal-close" onClick={close} title="Close">&times;</button>
        <h2 className="user-modal-title">{user.username}</h2>

        <div className="user-modal-section">
          <strong>Role:</strong> <span className="user-modal-role">{user.role || 'user'}</span>
        </div>
        <div className="user-modal-section">
          <strong>Team:</strong> <span className="user-modal-team">{user.teamNumber ?? '-'}</span>
        </div>
        <div className="user-modal-section subtle">
          <strong>Viewed by:</strong> <span className="user-modal-viewer">{currentUser} ({currentRole})</span>
        </div>

        <div className="user-modal-actions">
          {canManage && (
            <>
              <button className="user-modal-action promote" onClick={() => {/* TODO */}}>Promote/Demote</button>
              <button className="user-modal-action remove" onClick={() => {/* TODO */}}>Remove User</button>
            </>
          )}
          <button className="user-modal-action ok" onClick={close}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
