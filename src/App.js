import React from 'react';
import AdminDashboard from './Pages/AdminDashboard/AdminDasboard';
import './styles/global.css';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <div className="app">
      <UserProvider>
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Admin Dashboard</h2>
          <ul>
            <li>Dashboard</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="content-container">
          <AdminDashboard />
        </div>
      </UserProvider>
    </div>
  );
};

export default App;
