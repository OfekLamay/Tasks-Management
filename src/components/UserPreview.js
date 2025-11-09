import React, { useState } from 'react';
import UserInfo from './UserInfo';

const UserPreview = ({ userData, onRefresh }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <div
        className="userRow"
        onClick={() => setShowInfo(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') setShowInfo(true); }}
      >
        <div className="userRowCell userRowUser">{userData.username}</div>
        <div className="userRowCell userRowRole">{userData.role || 'user'}</div>
        <div className="userRowCell userRowTeam">{userData.teamNumber ?? '-'}</div>
      </div>
      {showInfo && (
        <UserInfo
          show={showInfo}
          user={userData}
          close={() => setShowInfo(false)}
          onUpdated={onRefresh}    // <-- refresh after role change
          onRemoved={onRefresh}    // <-- refresh after removal
        />
      )}
    </>
  );
};

export default UserPreview;


