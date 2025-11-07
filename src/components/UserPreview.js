import React, { useState } from 'react';
import UserInfo from './UserInfo';

const UserPreview = ({ userData }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="userPreview-wrapper">
      <div className="userPreview" onClick={() => setShowInfo(true)}>
        <div className="userPreview-name">
          <span className="userPreview-label">User:</span> {userData.username}
        </div>
        <div className="userPreview-role">
          <span className="userPreview-label">Role:</span> {userData.role || 'user'}
        </div>
        <div className="userPreview-team">
          <span className="userPreview-label">Team:</span> {userData.teamNumber ?? '-'}
        </div>
      </div>
      {showInfo && (
        <UserInfo show={showInfo} user={userData} close={() => setShowInfo(false)} />
      )}
    </div>
  );
};

export default UserPreview;


