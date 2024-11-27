import React, { useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserList from "../../components/UserList/UserList";
import UserModal from "../../components/UserModel/UserModal";
import { useUserContext } from "../../context/UserContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { users, addUser, editUser, deleteUser } = useUserContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // For editing existing user
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [filter, setFilter] = useState("all"); // For active/inactive filter
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [sortBy, setSortBy] = useState("name"); // Sorting field
  const [roleFilter, setRoleFilter] = useState("all"); // Role filter

  // Calculate total users, active/inactive users, and users by role
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.filter((user) => !user.isActive).length;

  // Categorize users by role
  const usersByRole = useMemo(() => {
    return users.reduce((acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = 0;
      }
      acc[user.role]++;
      return acc;
    }, {});
  }, [users]);

  // Apply filters and sort users
  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      // Filter by active/inactive status
      if (filter === "active") return user.isActive;
      if (filter === "inactive") return !user.isActive;
      return true; // Show all users
    });

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => {
        console.log('User Role:', user.role); // Debugging user roles
        return user.role === roleFilter;
      });
    }

    // Filter by search query (name or email)
    filtered = filtered.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting logic by name or date
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        const nameComparison = a.username.localeCompare(b.username);
        return sortOrder === "asc" ? nameComparison : -nameComparison;
      }
      if (sortBy === "date") {
        const dateComparison = new Date(a.createdAt) - new Date(b.createdAt);
        return sortOrder === "asc" ? dateComparison : -dateComparison;
      }
      return 0;
    });

    return filtered;
  }, [users, filter, searchQuery, sortBy, sortOrder, roleFilter]);

  const handleAddUser = async (userData) => {
    addUser(userData);
    setModalOpen(false);
  };

  const handleEditUser = async (userData) => {
    editUser(userData);
    setModalOpen(false);
    setCurrentUser(null); // Reset after edit
  };

  const handleDeleteUser = async (userId) => {
    deleteUser(userId);
  };

  const openModalForEdit = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const openModalForAdd = () => {
    setCurrentUser(null);
    setModalOpen(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <h1>Role-Based Access Control </h1>
          <button className="add-user-btn" onClick={openModalForAdd}>
            Add New User
          </button>
        </div>

        {/* Summary Section */}
        <div className="user-summary">
          <div className="summary-item">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="summary-item">
            <h3>Active Users</h3>
            <p>{activeUsers}</p>
          </div>
          <div className="summary-item">
            <h3>Inactive Users</h3>
            <p>{inactiveUsers}</p>
          </div>
          <div className="summary-item">
            <h3>Users by Role</h3>
            <ul>
              {Object.entries(usersByRole).map(([role, count]) => (
                <li key={role}>
                  {role}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="administrator">Administrator</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* User List */}
        <UserList
          users={filteredUsers}
          onEdit={openModalForEdit}
          onDelete={handleDeleteUser}
        />

        {/* User Modal for Add/Edit */}
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={currentUser ? handleEditUser : handleAddUser}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
