import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FAQsContainer = styled.div`
  padding: 0 20px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const BoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 55vh;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const Heading = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
`;

const AddBusinessButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4527a0;
  }
`;

const UsersRolesSection = () => {
  const navigate = useNavigate();

  const handleAddBusinessClick = () => {
    navigate('/profile/my-business'); // Redirect to my-business
  };

  return (
    <FAQsContainer>
      <SectionTitle>User & Roles</SectionTitle>
      <BoxList>
        {/* Image */}
        <Image src="../assets/BusinessAdd.svg" alt="Business Icon" />

        {/* Heading */}
        <Heading>Add your business to add user & roles</Heading>

        {/* Description */}
        <Description>
          You currently don’t have any business added to your service.
        </Description>

        {/* Button */}
        <AddBusinessButton onClick={handleAddBusinessClick}>
          + Add Business
        </AddBusinessButton>
      </BoxList>
    </FAQsContainer>
  );
};

export default UsersRolesSection;
