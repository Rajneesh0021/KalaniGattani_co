import React, { useState } from 'react';
import styled from 'styled-components';

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

const InfoBox = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const BoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 55vh;
  overflow-y: auto;
`;

const BusinessBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  border: 2px dotted #311b92;
  border-radius: 8px;
  background-color: white;
  color: #311b92;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e8eaf6;
  }
`;

const NewBusinessInput = styled.input`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const MyBusinessSection = () => {
  const [businesses, setBusinesses] = useState([]);
  const [newBusiness, setNewBusiness] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddBusiness = () => {
    if (newBusiness.trim()) {
      setBusinesses([...businesses, newBusiness]);
      setNewBusiness(''); // Clear the input after adding
      setShowInput(false); // Hide the input box after adding
    }
  };

  const handleNewBusinessClick = () => {
    setShowInput(true); // Show input box when clicked
  };

  return (
    <FAQsContainer>
      <SectionTitle>My Business</SectionTitle>
      <InfoBox>
        <p>Business that you are part of</p>
      </InfoBox>
      <div>
        <BoxList>
          {/* Existing businesses */}
          {businesses.map((business, index) => (
            <div key={index} style={{ padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
              {business}
            </div>
          ))}
          
          {/* Add New Business Box */}
          {!showInput && (
            <BusinessBox onClick={handleNewBusinessClick}>
              + Add New Business
            </BusinessBox>
          )}

          {/* Show input field if clicked */}
          {showInput && (
            <div>
              <NewBusinessInput
                type="text"
                placeholder="Enter business name"
                value={newBusiness}
                onChange={(e) => setNewBusiness(e.target.value)}
              />
              <button onClick={handleAddBusiness} style={{ marginTop: '10px' }}>
                Add Business
              </button>
            </div>
          )}
        </BoxList>
      </div>
    </FAQsContainer>
  );
};

export default MyBusinessSection;
