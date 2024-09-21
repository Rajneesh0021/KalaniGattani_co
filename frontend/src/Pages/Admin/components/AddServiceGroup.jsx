import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90vw;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;

const AddButton = styled.button`
  margin-top: 5px;
  background-color: #0288d1;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0277bd;
  }
`;

const AddServiceGroupModal = ({ showSGModal, closeModal, handleSaveGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [services, setServices] = useState([{ serviceName: '', description: '' }]);

  const handleAddService = () => {
    setServices([...services, { serviceName: '', description: '' }]);
  };

  const handleChangeService = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleSave = () => {
    const serviceGroupData = {
      groupName,
      services,
    };
    handleSaveGroup(serviceGroupData); // Pass data to parent for saving
  };

  if (!showSGModal) return null; // Renamed here

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>Close</CloseButton>
        <ModalTitle>Add Service Group</ModalTitle>

        <ModalInput
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <h4>Services</h4>
        {services.map((service, index) => (
          <div key={index}>
            <ModalInput
              type="text"
              placeholder="Service Name"
              value={service.serviceName}
              onChange={(e) => handleChangeService(index, 'serviceName', e.target.value)}
            />
            <ModalInput
              type="text"
              placeholder="Service Description"
              value={service.description}
              onChange={(e) => handleChangeService(index, 'description', e.target.value)}
            />
          </div>
        ))}
        <AddButton onClick={handleAddService}>Add Service</AddButton>

        <ModalButton onClick={handleSave}>Save Service Group</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddServiceGroupModal;
