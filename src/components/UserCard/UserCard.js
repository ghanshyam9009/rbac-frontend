import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import './UserCard.css';
import PermissionsPopup from '../../components/ManagePermission/PermissionsPopup'; // Import the Permissions Popup component

// Function to format the date and time
const formatDate = (date) => {
  const validDate = new Date(date);
  if (isNaN(validDate)) {
    return "Invalid Date";  // Return fallback if the date is invalid
  }

  // Extract date and time separately for styling
  const day = validDate.getDate().toString().padStart(2, '0');
  const month = (validDate.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
  const year = validDate.getFullYear();
  const hours = validDate.getHours().toString().padStart(2, '0');
  const minutes = validDate.getMinutes().toString().padStart(2, '0');

  // Return formatted date
  return {
    date: `${month}/${day}/${year}`,
    time: `${hours}:${minutes}`,
  };
};

const UserCard = ({ user, onEdit, onDelete }) => {
  const { date, time } = formatDate(user.createdAt);
  const { updateUserPermissions } = useUserContext();
  const [showPermissionsPopup, setShowPermissionsPopup] = useState(false);
  const [userPermissions, setUserPermissions] = useState(user.permissions);  // Independent state for permissions

  // Count the number of permissions for the user
  const permissionCount = userPermissions ? userPermissions.length : 0;

  const handlePermissionsChange = (permissions) => {
    setUserPermissions(permissions); // Update local state for this user only
    updateUserPermissions(user.id, permissions); // Ensure update happens on the server side as well
    setShowPermissionsPopup(false); // Close the popup after updating permissions
  };

  return (
    <div className={`user-card ${user.isActive ? 'active' : 'inactive'}`}>
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p className={`status ${user.isActive ? 'active-status' : 'inactive-status'}`}>
        Status: {user.isActive ? 'Active' : 'Inactive'}
      </p>
      <div className="created-at-container">
        <p className="created-at">{date}</p>
        <p className="created-at-time">{time}</p>
      </div>

      {/* Display the number of permissions */}
      <p className="permissions-count">
        Permissions: {permissionCount} {permissionCount === 1 ? 'permission' : 'permissions'}
      </p>

      <div className="actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
        <button onClick={() => setShowPermissionsPopup(true)}>Manage Permissions</button>
      </div>

      {showPermissionsPopup && (
        <PermissionsPopup
          user={user}
          currentPermissions={userPermissions} // Pass current user permissions
          onClose={() => setShowPermissionsPopup(false)}
          onSave={handlePermissionsChange}
        />
      )}
    </div>
  );
};

export default UserCard;
