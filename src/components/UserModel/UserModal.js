import React, { useState, useEffect } from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSave, currentUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User'); // Default role is User
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setRole(currentUser.role);
      setIsActive(currentUser.isActive);
    }
  }, [currentUser]);

  const handleSubmit = () => {
    const userData = { username, email, role, isActive };
    if (currentUser) {
      userData.id = currentUser.id;
    }
    onSave(userData);
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>{currentUser ? 'Edit User' : 'Add User'}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Generator">Generator</option>
          </select>

          <label>
            Active
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </label>

          <div className="modal-actions">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserModal;
