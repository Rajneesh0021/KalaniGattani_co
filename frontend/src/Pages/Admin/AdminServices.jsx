import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import axios for API requests
import AddServiceModal from './components/AddServiceModal';
import AddServiceGroupModal from './components/AddServiceGroup';
import ServiceManagement from './components/ServicesList';

const AdminServicesContainer = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Btngroup = styled.div`
  display: flex;
  gap: 5px;
`;

const AddServiceButton = styled.button`
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

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSGModal, setShowSGModal] = useState(false);

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/service'); 
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices(); // Fetch services when the component mounts
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleAddService = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  const handleAddSG = () => {
    setShowSGModal(true);
    setIsEditing(false);
  };

  const handleSaveService = async (serviceData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/service', serviceData); // Adjust the endpoint as needed
      setServices((prevServices) => [...prevServices, response.data]); // Update state with the new service
      setShowModal(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSGModal = () => {
    setShowSGModal(false);
  };

  const handleSaveGroup = (groupData) => {
    console.log('Service Group Data:', groupData);
    setShowSGModal(false);
  };

  return (
    <AdminServicesContainer>
      <Header>
        <Title>Services</Title>
        <Btngroup>
          <AddServiceButton onClick={handleAddSG}>Add Service Group</AddServiceButton>
          <AddServiceButton onClick={handleAddService}>Add Service</AddServiceButton>
        </Btngroup>
      </Header>

      <ServiceManagement services={filteredServices} />
      {showModal && (
        <AddServiceModal
          showModal={showModal}
          closeModal={closeModal}
          title={'Add Service'}
          handleSaveService={handleSaveService}
          isEditing={isEditing}
        />
      )}
      <AddServiceGroupModal
        showSGModal={showSGModal}
        closeSGModal={closeSGModal}
        handleSaveGroup={handleSaveGroup}
      />
    </AdminServicesContainer>
  );
};

export default AdminServices;
