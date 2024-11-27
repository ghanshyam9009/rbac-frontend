import React, { useState } from 'react';
import './PermissionsPopup.css';

const PermissionsPopup = ({ user, currentPermissions, onClose, onSave }) => {
  const [permissions, setPermissions] = useState(currentPermissions);
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  // Toggle checkbox state based on user selection
  const handleCheckboxChange = (permission) => {
    setPermissions((prevPermissions) => {
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((perm) => perm !== permission);
      } else {
        return [...prevPermissions, permission];
      }
    });
  };

  // Save permissions and close the modal
  const handleSave = () => {
    onSave(permissions);
    setIsOpen(false); // Close the modal after saving
  };

  // Close the modal when cancel is clicked
  const handleCancel = () => {
    setIsOpen(false); // Close the modal
    if (onClose) {
      onClose(); // Call the onClose function if it's passed
    }
  };

  return (
    <div>
      {/* Button to open the permissions modal */}
      <button onClick={() => setIsOpen(true)}>Manage Permissions</button> 

      {/* Modal popup, only shown when isOpen is true */}
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <h3>Manage Permissions for {user.username}</h3>
          <div className="permissions-list">
            {/* Permission checkboxes */}
            <label>
              <input
                type="checkbox"
                checked={permissions.includes('read')}
                onChange={() => handleCheckboxChange('read')}
              />
              Read
            </label>
            <label>
              <input
                type="checkbox"
                checked={permissions.includes('write')}
                onChange={() => handleCheckboxChange('write')}
              />
              Write
            </label>
            <label>
              <input
                type="checkbox"
                checked={permissions.includes('update')}
                onChange={() => handleCheckboxChange('update')}
              />
              Update
            </label>
            <label>
              <input
                type="checkbox"
                checked={permissions.includes('delete')}
                onChange={() => handleCheckboxChange('delete')}
              />
              Delete
            </label>
          </div>
          <div className="modal-actions">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPopup;
