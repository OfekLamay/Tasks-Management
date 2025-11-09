import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserInfo = ({ show, user, close, onUpdated, onRemoved }) => {
  const { username: currentUser, role: currentRole, teamNumber: currentTeam } = useSelector(state => state.user);
  const [working, setWorking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [localRole, setLocalRole] = useState(user.role || 'user');
  const [localTeam, setLocalTeam] = useState(user.teamNumber);

  if (!show) return null;

  const sameTeam = user.teamNumber === currentTeam;
  const isSelf = user.username === currentUser;

  const canBaseManage =
    currentRole === 'admin' ||
    (currentRole === 'manager' && sameTeam && user.teamNumber !== -1);

  const canPromoteToManager =
    (currentRole === 'admin' && localRole !== 'manager') ||
    (currentRole === 'manager' && sameTeam && localRole === 'user');

  const canDemoteToUser =
    currentRole === 'admin' && localRole === 'manager';

  const canPromoteToAdmin =
    currentRole === 'admin' && localRole !== 'admin';

  const canDemoteAdmin =
    currentRole === 'admin' && localRole === 'admin';

  const canSoftRemove =
    canBaseManage && !isSelf && localRole !== 'admin' && localTeam !== -1;

  const canHardDelete =
    currentRole === 'admin' && !isSelf;

  async function callRoleChange(nextRole) {
    setWorking(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/manage/set-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterUsername: currentUser,
            username: user.username,
          role: nextRole
        })
      });
      const data = await res.json();
      if (data.updated) {
        setLocalRole(nextRole);
        onUpdated && onUpdated();
      } else setErrorMsg(data.error || 'Update failed');
    } catch {
      setErrorMsg('Network error');
    } finally {
      setWorking(false);
    }
  }

  async function softRemove() {
    if (!window.confirm(`Remove ${user.username} from team?`)) return;
    setWorking(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/manage/remove-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterUsername: currentUser,
          username: user.username
        })
      });
      const data = await res.json();
      if (data.removedFromTeam) {
        setLocalTeam(-1);
        onRemoved && onRemoved();
        close && close();
      } else setErrorMsg(data.error || 'Removal failed');
    } catch {
      setErrorMsg('Network error');
    } finally {
      setWorking(false);
    }
  }

  async function hardDelete() {
    if (!window.confirm(`Permanently DELETE ${user.username} and all their tasks?`)) return;
    setWorking(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/manage/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterUsername: currentUser,
          username: user.username
        })
      });
      const data = await res.json();
      if (data.deleted) {
        onRemoved && onRemoved();
        close && close();
      } else setErrorMsg(data.error || 'Delete failed');
    } catch {
      setErrorMsg('Network error');
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-card">
        <button className="user-modal-close" onClick={close} title="Close">&times;</button>
        <h2 className="user-modal-title">{user.username}</h2>

        <div className="user-modal-section">
          <strong>Role:</strong> <span className="user-modal-role">{localRole}</span>
        </div>
        <div className="user-modal-section">
          <strong>Team:</strong> <span className="user-modal-team">{localTeam ?? '-'}</span>
        </div>
        <div className="user-modal-section subtle">
          <strong>Viewed by:</strong> <span className="user-modal-viewer">{currentUser} ({currentRole})</span>
        </div>

        {errorMsg && <div className="user-modal-error">{errorMsg}</div>}
        {working && <div className="user-modal-working">Processing...</div>}

        <div className="user-modal-actions">
          {canPromoteToManager && (
            <button className="user-modal-action promote" disabled={working} onClick={() => callRoleChange('manager')}>
              Promote to manager
            </button>
          )}
          {canDemoteToUser && (
            <button className="user-modal-action promote" disabled={working} onClick={() => callRoleChange('user')}>
              Demote to user
            </button>
          )}
          {canPromoteToAdmin && (
            <button className="user-modal-action promote" disabled={working} onClick={() => callRoleChange('admin')}>
              Promote to admin
            </button>
          )}
          {canDemoteAdmin && (
            <>
              <button className="user-modal-action promote" disabled={working} onClick={() => callRoleChange('manager')}>
                Admin → manager
              </button>
              <button className="user-modal-action promote" disabled={working} onClick={() => callRoleChange('user')}>
                Admin → user
              </button>
            </>
          )}
          {canSoftRemove && (
            <button className="user-modal-action remove" disabled={working} onClick={softRemove}>
              Remove from team
            </button>
          )}
          {canHardDelete && (
            <button className="user-modal-action remove" disabled={working} onClick={hardDelete}>
              Delete user
            </button>
          )}
          <button className="user-modal-action ok" onClick={close} disabled={working}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
