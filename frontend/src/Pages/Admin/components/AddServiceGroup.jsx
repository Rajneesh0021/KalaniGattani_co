import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose } from "react-icons/md";
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



const AddServiceGroupModal = ({ showSGModal, closeSGModal, handleSaveGroup, isEditing }) => {
  const [groupName, setGroupName] = useState('');

  const handleSave = () => {
    const serviceGroupData = {
     name: groupName,
    };
    handleSaveGroup(serviceGroupData);
  };

  if (!showSGModal) return null; 

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeSGModal}><MdClose/></CloseButton>
        <ModalTitle>{isEditing ? 'Edit Service Group' : 'Add Service Group'}</ModalTitle>
        <ModalInput
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <ModalButton onClick={handleSave}>Save Service Group</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddServiceGroupModal;
