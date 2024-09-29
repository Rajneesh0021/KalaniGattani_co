import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'
const FAQsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background-color: #e8eaf6;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    background-color: #311b92;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4527a0;
    }

    @media (max-width: 768px) {
      padding: 8px 15px;
      font-size: 14px;
    }
  }
`;

const BoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 45vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 25px;
  border-radius: 10px;
  background-color: #f9f9f9;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  h3 {
    font-size: 22px;
    color: #311b92;
    margin-bottom: 10px;
  }

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  input,
  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #311b92;
    }
  }

  input[type="file"] {
    padding: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 16px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4527a0;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }
`;

const ProfileSection = () => {
  const [activeForm, setActiveForm] = useState('personal'); 
  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    gender: '',
    email: '',
    phonenumber: '',
    address1: '',
    address2: '',
    pincode: '',
    district: '',
    city: '',
    state: '',
    pannumber: '',
    pannumber: '',
    profileImage: ''
  });

  
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

 
  const handleSave = async () => {


    try {
      // API call to save data to backend
      const token = localStorage.getItem('usertoken'); // Retrieve token from localStorage

const response = await axios.put(
  'http://localhost:5000/api/user', 
  formData, 
  {
    headers: {
      Authorization: `${token}`,
    },
  }
);


      if (response.data.success) {
        console.log('Data saved to backend:', response.data);
        
        if (activeForm === 'personal') {
          setActiveForm('address');
        } else if (activeForm === 'address') {
          setActiveForm('kyc');
        } else if (activeForm === 'kyc') {
          alert('Data saved successfully!');
        }
      } else {
        console.error('Failed to save data:', response.data.message);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data to backend:', error);
      alert('Error saving data to the server. Please try again later.');
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value, 
  });
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'personal':
        return (
          <form>
            <h3>Personal Details</h3>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>DOB</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                readOnly
              />
            </div>
            <ButtonGroup>
              <Button onClick={() => setActiveForm('')}>Back</Button>
              <Button type="button" onClick={handleSave}>Save & Next</Button>
            </ButtonGroup>
          </form>
        );
      case 'address':
        return (
          <form>
            <h3>Address Details</h3>
            <div>
              <label>Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>PIN Code</label>
              <input
                type="number"
                name="pinCode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <ButtonGroup>
              <Button onClick={() => setActiveForm('')}>Back</Button>
              <Button type="button" onClick={handleSave}>Save & Next</Button>
            </ButtonGroup>
          </form>
        );
      case 'kyc':
        return (
          <form>
            <h3>KYC Details</h3>
            <div>
              <label>Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                value={formData.adharnumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>PAN Number</label>
              <input
                type="text"
                name="pan"
                value={formData.pannumber}
                onChange={handleChange}
              />
            </div>
            <ButtonGroup>
              <Button onClick={() => setActiveForm('')}>Back</Button>
              <Button type="button" onClick={handleSave}>Save</Button>
            </ButtonGroup>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <FAQsContainer>
      <SectionTitle>Profile</SectionTitle>
      <InfoBox>
        <button onClick={() => setActiveForm('personal')}>Personal Details</button>
        <button onClick={() => setActiveForm('address')}>Address</button>
        <button onClick={() => setActiveForm('kyc')}>KYC</button>
      </InfoBox>
      <BoxList>{renderForm()}</BoxList>
    </FAQsContainer>
  );
};

export default ProfileSection;

