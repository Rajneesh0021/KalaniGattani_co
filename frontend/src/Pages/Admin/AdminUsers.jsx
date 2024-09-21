// UserPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Styled Components
const UserContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const AddUserButton = styled.button`
  padding: 10px 20px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4527a0;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const UserStatus = styled.span`
  font-size: 14px;
  color: ${props => (props.active ? 'green' : 'red')};
`;

const UserActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;

  &.edit {
    background-color: #0288d1;
  }

  &.delete {
    background-color: #d32f2f;
  }

  &:hover {
    opacity: 0.8;
  }
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4527a0;
  }
`;

const AdminUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', active: true },
    { id: 2, name: 'User 2', active: false },
    { id: 3, name: 'User 3', active: true },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserStatus, setNewUserStatus] = useState(true);

  const handleAddUser = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewUserName('');
    setNewUserStatus(true);
  };

  const handleEditUser = (user) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentUser(user);
    setNewUserName(user.name);
    setNewUserStatus(user.active);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSaveUser = () => {
    if (isEditing) {
      setUsers(users.map((user) =>
        user.id === currentUser.id ? { ...user, name: newUserName, active: newUserStatus } : user
      ));
    } else {
      const newUser = { id: users.length + 1, name: newUserName, active: newUserStatus };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  return (
    <UserContainer>
      <Header>
        <Title>Users</Title>
        <AddUserButton onClick={handleAddUser}>Add User</AddUserButton>
      </Header>

      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            {user.name} <UserStatus active={user.active}>{user.active ? 'Active' : 'Inactive'}</UserStatus>
            <UserActions>
              <ActionButton className="edit" onClick={() => handleEditUser(user)}>
                <FaEdit /> Edit
              </ActionButton>
              <ActionButton className="delete" onClick={() => handleDeleteUser(user.id)}>
                <FaTrash /> Delete
              </ActionButton>
            </UserActions>
          </UserItem>
        ))}
      </UserList>

      {/* Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>{isEditing ? 'Edit User' : 'Add User'}</ModalTitle>
            <ModalInput
              type="text"
              placeholder="User name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={newUserStatus}
                  onChange={() => setNewUserStatus(!newUserStatus)}
                />
                Active
              </label>
            </div>
            <ModalButton onClick={handleSaveUser}>
              {isEditing ? 'Save Changes' : 'Add User'}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </UserContainer>
  );
};

export default AdminUser;
