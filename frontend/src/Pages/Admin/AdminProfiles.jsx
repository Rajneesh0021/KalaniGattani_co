import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const ProfileContainer = styled.div`
  padding: 20px;
  height:90vh;
  overflow:scroll;
`;

const ProfileForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

const SaveButton = styled.button`
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

// Dummy profile data
const profileData = {
  fullname: 'John Doe',
  email: 'john.doe@example.com',
  phonenumber: '123-456-7890',
  gender: 'Male',
  dob: '1990-01-01',
  address1: '123 Main St',
  address2: '',
  pincode: '123456',
  district: 'Sample District',
  city: 'Sample City',
  state: 'Sample State',
  adharnumber: '1234-5678-9123',
  pannumber: 'ABCDE1234F',
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(profileData);
  const [editProfile, setEditProfile] = useState(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editProfile);
  };

  return (
    <ProfileContainer>
      <ProfileForm onSubmit={handleSave}>
        <FormGroup>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            value={editProfile.fullname}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={editProfile.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phonenumber">Phone Number</Label>
          <Input
            id="phonenumber"
            name="phonenumber"
            type="text"
            value={editProfile.phonenumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            name="gender"
            type="text"
            value={editProfile.gender}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={editProfile.dob}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address1">Address 1</Label>
          <Input
            id="address1"
            name="address1"
            type="text"
            value={editProfile.address1}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address2">Address 2</Label>
          <Input
            id="address2"
            name="address2"
            type="text"
            value={editProfile.address2}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            type="text"
            value={editProfile.pincode}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            name="district"
            type="text"
            value={editProfile.district}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City/Town/Village</Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={editProfile.city}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            type="text"
            value={editProfile.state}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="adharnumber">Aadhar Number</Label>
          <Input
            id="adharnumber"
            name="adharnumber"
            type="text"
            value={editProfile.adharnumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="pannumber">PAN Number</Label>
          <Input
            id="pannumber"
            name="pannumber"
            type="text"
            value={editProfile.pannumber}
            onChange={handleChange}
          />
        </FormGroup>
        <SaveButton type="submit">Save Changes</SaveButton>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default ProfilePage;
