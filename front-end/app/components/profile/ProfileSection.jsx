import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  const [activeForm, setActiveForm] = useState('personal'); // To track which form is active
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    pinCode: '',
    district: '',
    city: '',
    state: '',
    aadhar: '',
    pan: '',
    profileImage:''
  });

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setFormData(JSON.parse(storedUserData));
    }
  }, []);

  // Save data to localStorage when the user saves the form
  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(formData));
    console.log('Saved Data:', formData);

    // Move to the next form or finish process
    if (activeForm === 'personal') {
      setActiveForm('address');
    } else if (activeForm === 'address') {
      setActiveForm('kyc');
    } else if (activeForm === 'kyc') {
      alert('Data saved successfully!');
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
                name="name"
                value={formData.name}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                contentEditable={false}
              />
            </div>
            <ButtonGroup>
              <Button onClick={() => setActiveForm('')}>Back</Button>
              <Button onClick={handleSave}>Save & Next</Button>
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
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>PIN Code</label>
              <input
                type="number"
                name="pinCode"
                value={formData.pinCode}
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
              <Button onClick={handleSave}>Save & Next</Button>
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
                value={formData.aadhar}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>PAN Number</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
              />
            </div>
            <ButtonGroup>
              <Button onClick={() => setActiveForm('')}>Back</Button>
              <Button onClick={handleSave}>Save</Button>
            </ButtonGroup>
          </form>
        );
      
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
