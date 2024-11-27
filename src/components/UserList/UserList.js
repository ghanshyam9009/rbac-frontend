import React from "react";
import UserCard from "../UserCard/UserCard";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete}) => {
  return (
    <div className="user-cards-container">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UserList;
