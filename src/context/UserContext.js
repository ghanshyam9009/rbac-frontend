import React, { createContext, useState, useContext } from 'react';

// Create a Context for user data
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const loadUsersFromStorage = () => {
    const usersData = JSON.parse(localStorage.getItem('users')) || [
      { id: 1, username: 'John Doe', email: 'john@example.com', role: 'Admin', isActive: true, createdAt: '2024-11-26T12:34:56', permissions: [] },
      { id: 2, username: 'Jane Smith', email: 'jane@example.com', role: 'Manager', isActive: false, createdAt: '2024-10-15T14:30:45', permissions: [] },
      { id: 3, username: 'Alice Johnson', email: 'alice@example.com', role: 'User', isActive: true, createdAt: '2024-09-10T08:00:00', permissions: [] },
    ];
    return usersData;
  };

  const saveUsersToStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const [users, setUsers] = useState(loadUsersFromStorage);

  const addUser = (userData) => {
    setUsers((prevUsers) => {
      const newUser = { ...userData, id: prevUsers.length + 1, createdAt: new Date().toISOString(), permissions: [] };
      const newUsers = [...prevUsers, newUser];
      saveUsersToStorage(newUsers); 
      return newUsers;
    });
  };

  const editUser = (userData) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userData.id ? userData : user
      );
      saveUsersToStorage(updatedUsers); 
      return updatedUsers;
    });
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== userId);
      saveUsersToStorage(updatedUsers);
      return updatedUsers;
    });
  };

  const updateUserPermissions = (userId, permissions) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, permissions } : user
      );
      saveUsersToStorage(updatedUsers);
      return updatedUsers;
    });
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser, updateUserPermissions }}>
      {children}
    </UserContext.Provider>
  );
};
