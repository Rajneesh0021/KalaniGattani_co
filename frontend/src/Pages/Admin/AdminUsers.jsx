import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteData, fetchData, postData, updateData } from '../../services/apiServices';

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
  color: ${(props) => (props.active ? 'green' : 'red')};
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
  width: 500px;
  max-width: 90%;
  height:90vh;
  overflow: scroll;
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

const ModalSelect = styled.select`
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
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    gender: 'Male',
    isActive: false, // Correct initial state as a boolean
    dob: '',
    address1: '',
    address2: '',
    pincode: '',
    district: '',
    city: '',
    state: '',
    adharnumber: '',
    pannumber: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetchData('/user');
      setUsers(response.user);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({
      fullname: '',
      email: '',
      phonenumber: '',
      gender: 'Male',
      dob: '',
      isActive: false, // Ensure initial state is false
      address1: '',
      address2: '',
      pincode: '',
      district: '',
      city: '',
      state: '',
      adharnumber: '',
      pannumber: '',
    });
  };

  const handleEditUser = (user) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentUser(user);
    setFormData({
      fullname: user.fullname || '',
      email: user.email || '',
      phonenumber: user.phonenumber || '',
      gender: user.gender || 'Male',
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      isActive: user.isActive || false, // Correct boolean value assignment
      address1: user.address1 || '',
      address2: user.address2 || '',
      pincode: user.pincode || '',
      district: user.district || '',
      city: user.city || '',
      state: user.state || '',
      adharnumber: user.adharnumber || '',
      pannumber: user.pannumber || '',
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteData(`/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSaveUser = async () => {
    if (isEditing) {
      try {
        await updateData(`/user/${currentUser._id}`, formData);
        setUsers(users.map((user) => (user._id === currentUser._id ? { ...user, ...formData } : user)));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      try {
        const response = await postData('/user', formData);
        setUsers([...users, response.newUser]);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isActive: e.target.checked, // Toggle the checkbox value
    });
  };

  return (
    <UserContainer>
      <Header>
        <Title>Users</Title>
        <AddUserButton onClick={handleAddUser}>Add User</AddUserButton>
      </Header>

      <UserList>
        {users.map((user) => (
          <UserItem key={user._id}>
            {user.fullname} <UserStatus active={user.isActive}>{user.isActive ? 'Active' : 'Inactive'}</UserStatus>
            <UserActions>
              <ActionButton className="edit" onClick={() => handleEditUser(user)}>
                <FaEdit /> Edit
              </ActionButton>
              <ActionButton className="delete" onClick={() => handleDeleteUser(user._id)}>
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
            <div>
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive} // Bind the checkbox to formData.isActive
                  onChange={handleCheckboxChange} // Use checkbox handler
                />
                Active
              </label>
            </div>
            <ModalInput
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <ModalInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />
            <ModalSelect name="gender" value={formData.gender} onChange={handleInputChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </ModalSelect>
            <ModalInput
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="address1"
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="address2"
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="adharnumber"
              placeholder="Aadhar Number"
              value={formData.adharnumber}
              onChange={handleInputChange}
            />
            <ModalInput
              type="text"
              name="pannumber"
              placeholder="PAN Number"
              value={formData.pannumber}
              onChange={handleInputChange}
            />
            <ModalButton onClick={handleSaveUser}>
              {isEditing ? 'Update User' : 'Add User'}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </UserContainer>
  );
};

export default AdminUser;

