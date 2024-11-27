// Function to load users from localStorage or use default data
const loadUsersFromStorage = () => {
  const usersData = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, username: 'John Doe', email: 'john@example.com', role: 'Admin', isActive: true, createdAt: '2024-11-26T12:34:56' },
    { id: 2, username: 'Jane Smith', email: 'jane@example.com', role: 'Manager', isActive: false, createdAt: '2024-10-15T14:30:45' },
    { id: 3, username: 'Alice Johnson', email: 'alice@example.com', role: 'User', isActive: true, createdAt: '2024-09-10T08:00:00' },
  ];
  return usersData;
};

// Function to save users to localStorage
const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Fetch users from localStorage with simulated network delay
export const fetchUsers = async () => {
  return new Promise((resolve) => {
    const usersData = loadUsersFromStorage();
    setTimeout(() => {
      resolve(usersData);
    }, 1000); // Simulate network delay
  });
};

// Create a new user and save to localStorage
export const createUser = async (userData) => {
  return new Promise((resolve) => {
    const users = loadUsersFromStorage();  // Load existing users from localStorage
    const newUser = { ...userData, id: users.length + 1, createdAt: new Date().toISOString() };  // Add createdAt
    users.push(newUser);  // Add the new user to the list
    saveUsersToStorage(users);  // Save updated list back to localStorage
    setTimeout(() => {
      resolve(newUser);  // Simulate network delay
    }, 1000);
  });
};

// Edit an existing user and save to localStorage
export const editUser = async (userData) => {
  return new Promise((resolve) => {
    const users = loadUsersFromStorage();  // Load existing users from localStorage
    const index = users.findIndex((user) => user.id === userData.id);  // Find user by ID
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };  // Update the user data
      saveUsersToStorage(users);  // Save updated list to localStorage
      setTimeout(() => {
        resolve(userData);  // Simulate network delay
      }, 1000);
    }
  });
};

// Delete a user and update localStorage
export const deleteUser = async (userId) => {
  return new Promise((resolve) => {
    const users = loadUsersFromStorage();  // Load existing users from localStorage
    const updatedUsers = users.filter((user) => user.id !== userId);  // Remove user by ID
    saveUsersToStorage(updatedUsers);  // Save updated list to localStorage
    setTimeout(() => {
      resolve(userId);  // Simulate network delay
    }, 1000);
  });
};
