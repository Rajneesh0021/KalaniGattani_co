import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { deleteData, fetchData, postData, updateData } from '../../services/apiServices';

// Styled Components (same as before)
const ConsultantContainer = styled.div`
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

const AddConsultantButton = styled.button`
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

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ConsultantList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ConsultantItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ConsultantActions = styled.div`
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

// Modal Components (same as before)
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

const AdminConsultant = () => {
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConsultant, setCurrentConsultant] = useState(null);
  const [newConsultant, setNewConsultant] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    fetchConsultants();
  }, []);

  // Fetch consultants from API
  const fetchConsultants = async () => {
    try {
      const response = await fetchData('/consultant');
      console.log(response)
      setConsultants(response.consultants);
      setFilteredConsultants(response.consultants);
    } catch (error) {
      console.error('Error fetching consultants', error);
    }
  };

  // Filter consultants based on search term
  useEffect(() => {
    const filtered = consultants.filter((consultant) =>
      consultant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConsultants(filtered);
  }, [searchTerm, consultants]);

  // Handle opening modal for adding a new consultant
  const handleAddConsultant = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewConsultant({ name: '', email: '', password: '' });
  };

  // Handle opening modal for editing a consultant
  const handleEditConsultant = (consultant) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentConsultant(consultant);
    setNewConsultant({ name: consultant.name, email: consultant.email, password: '' });
  };

  // Handle deleting a consultant
  const handleDeleteConsultant = async (consultantId) => {
    try {
      await deleteData(`/consultant/${consultantId}`);
      setConsultants(consultants.filter((consultant) => consultant._id !== consultantId));
    } catch (error) {
      console.error('Error deleting consultant', error);
    }
  };

  // Handle saving a new or updated consultant
  const handleSaveConsultant = async () => {
    if (isEditing) {
      try {
        await updateData(`/consultant/${currentConsultant._id}`, newConsultant);
        setConsultants(
          consultants.map((consultant) =>
            consultant._id === currentConsultant._id ? { ...consultant, ...newConsultant } : consultant
          )
        );
      } catch (error) {
        console.error('Error updating consultant', error);
      }
    } else {
      try {
        const response = await postData('/consultant', newConsultant);
        console.log(response)
        
        
      } catch (error) {
        console.error('Error adding consultant', error);
      }
    }
    setShowModal(false);
  };

  return (
    <ConsultantContainer>
      <Header>
        <Title>Consultants</Title>
        <AddConsultantButton onClick={handleAddConsultant}>Add Consultant</AddConsultantButton>
      </Header>

      <SearchInput
        type="text"
        placeholder="Search consultants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ConsultantList>
        {filteredConsultants.map((consultant) => (
          <ConsultantItem key={consultant._id}>
            {consultant.name}
            <ConsultantActions>
              <ActionButton className="edit" onClick={() => handleEditConsultant(consultant)}>
                <FaEdit /> Edit
              </ActionButton>
              <ActionButton className="delete" onClick={() => handleDeleteConsultant(consultant._id)}>
                <FaTrash /> Delete
              </ActionButton>
            </ConsultantActions>
          </ConsultantItem>
        ))}
      </ConsultantList>

      {/* Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>{isEditing ? 'Edit Consultant' : 'Add Consultant'}</ModalTitle>
            <ModalInput
              type="text"
              placeholder="Consultant name"
              value={newConsultant.name}
              onChange={(e) => setNewConsultant({ ...newConsultant, name: e.target.value })}
            />
            <ModalInput
              type="email"
              placeholder="Consultant email"
              value={newConsultant.email}
              onChange={(e) => setNewConsultant({ ...newConsultant, email: e.target.value })}
            />
            {!isEditing && (
              <ModalInput
                type="password"
                placeholder="Consultant password"
                value={newConsultant.password}
                onChange={(e) => setNewConsultant({ ...newConsultant, password: e.target.value })}
              />
            )}
            <ModalButton onClick={handleSaveConsultant}>
              {isEditing ? 'Save Changes' : 'Add Consultant'}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </ConsultantContainer>
  );
};

export default AdminConsultant;
