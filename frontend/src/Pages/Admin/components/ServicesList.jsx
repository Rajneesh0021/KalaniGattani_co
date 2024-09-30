import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import axios for API requests
import AddServiceModal from './AddServiceModal'; 
import AddServiceGroupModal from './AddServiceGroup';
import { deleteData, fetchData, postData, updateData } from '../../../services/apiServices';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ServiceGroupList = styled(ServiceList)``;

const ServiceItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServiceActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.className === 'edit' ? '#4caf50' : '#f44336')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.className === 'edit' ? '#388e3c' : '#e53935')};
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
// Component
const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [searchServiceTerm, setSearchServiceTerm] = useState('');
  const [searchServiceGroupTerm, setSearchServiceGroupTerm] = useState('');
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSGModal, setShowSGModal] = useState(false);
 
  const [isEditing, setIsEditing] = useState(false);
 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        // fetchData
        const response = await fetchData('/service'); // Use the service function for GET request
        console.log(response)
        setServices(response.services); // Assuming response format
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchServiceGroups = async () => {
      try {
        const response = await fetchData('/servicegroup'); // Use the service function for GET request
        console.log(response)
        setServiceGroups(response.serviceGroups); // Assuming response format
      } catch (error) {
        console.error('Error fetching service groups:', error);
      }
    };

    fetchServices();
    fetchServiceGroups();
  }, []);

  // Filter services and service groups based on the search term
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchServiceTerm.toLowerCase())
  );

  const filteredServiceGroups = serviceGroups.filter(group =>
    group.name.toLowerCase().includes(searchServiceGroupTerm.toLowerCase())
  );
 // Handle adding a new service
 const handleAddService = () => {
  setShowModal(true);
  setIsEditing(false);
};

// Handle adding a new service group
const handleAddSG = () => {
  setShowSGModal(true);
  setIsEditing(false);
};
  // Handle edit action for services
  const handleEditService = (service) => {
    setEditService(service);
    setShowModal(true);
    handleUpdateService(service)
  };

  // Handle edit action for service groups
  const handleEditSG = (group) => {
    setIsEditing(true)
    setShowSGModal(true);
    handleUpdateGroup(group)
  };

  // Handle delete action for services and service groups
  const handleDeleteService = async (id, isGroup = false) => {
    try {
      if (isGroup) {
        await deleteData(`/servicegroup/${id}`); // Use the service function for DELETE request
        setServiceGroups(serviceGroups.filter(group => group._id !== id));
      } else {
        await deleteData(`/service/${id}`); // Use the service function for DELETE request
        setServices(services.filter(service => service.id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Handle save action for services
  const handleSaveService = async (Service) => {
    try {
      console.log(Service)
      const response = await postData(`/service`, Service); // Use the service function for PUT request
      setServices(services.map(service =>
        service._id === Service._id ? response : service
      ));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Handle save action for service groups
  const handleSaveGroup = async (groupData) => {
    try {
      
      const response = await postData('/servicegroup', groupData); // Use the service function for POST request
      console.log(response.serviceGroup)
      setServiceGroups((prevGroups) => [...prevGroups, response.serviceGroup]);
      setShowSGModal(false);
    } catch (error) {
      console.error('Error adding service group:', error);
    }
  };
  // updateData
  const handleUpdateService = async (updatedService) => {
    try {
      const response = await updateData(`/services/${updatedService.id}`, updatedService); // Use the service function for PUT request
      setServices(services.map(service =>
        service.id === updatedService.id ? response : service
      ));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // Handle save action for service groups
  const handleUpdateGroup = async (groupData) => {
    try {
      
      const response = await postData('/servicegroup', groupData); // Use the service function for POST request
      setServiceGroups((prevGroups) => [...prevGroups, response]);
      setShowSGModal(false);
    } catch (error) {
      console.error('Error adding service group:', error);
    }
  };
  // Close the modal
  const closeSGModal = () => {
    setShowSGModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header>
        <Title>Services</Title>
        <Btngroup>
          <AddServiceButton onClick={handleAddSG}>Add Service Group</AddServiceButton>
          <AddServiceButton onClick={handleAddService}>Add Service</AddServiceButton>
        </Btngroup>
      </Header>
    <Container>
      {/* Service Groups Section */}
    
      <Section>
        <h3>Service Groups</h3>
        <SearchInput
          type="text"
          placeholder="Search service groups..."
          value={searchServiceGroupTerm}
          onChange={(e) => setSearchServiceGroupTerm(e.target.value)}
        />
        <ServiceGroupList>
          {filteredServiceGroups.map((group) => (
            <ServiceItem key={group.id}>
              {group.name}
              <ServiceActions>
                <ActionButton className="edit" onClick={() => handleEditSG(group._id)}>
                  Edit
                </ActionButton>
                <ActionButton className="delete" onClick={() => handleDeleteService(group._id, true)}>
                  Delete
                </ActionButton>
              </ServiceActions>
            </ServiceItem>
          ))}
        </ServiceGroupList>
      </Section>

      {/* Services Section */}
      <Section>
        <h3>Services</h3>
        <SearchInput
          type="text"
          placeholder="Search services..."
          value={searchServiceTerm}
          onChange={(e) => setSearchServiceTerm(e.target.value)}
        />
        <ServiceList>
          {filteredServices.map((service) => (
            <ServiceItem key={service.id}>
              {service.name}
              <ServiceActions>
                <ActionButton className="edit" onClick={() => handleEditService(service)}>
                  Edit
                </ActionButton>
                <ActionButton className="delete" onClick={() => handleDeleteService(service._id)}>
                  Delete
                </ActionButton>
              </ServiceActions>
            </ServiceItem>
          ))}
        </ServiceList>
      </Section>

      {/* Modal for editing services */}
      {showModal && (
        <AddServiceModal
          showModal={showModal}
          isEditing={isEditing}
          service={editService}
          closeModal={closeModal}
          handleSaveService={handleSaveService}
        />
      )}

      {/* Modal for adding service group */}
      {showSGModal && (
        <AddServiceGroupModal
          showSGModal={showSGModal} 
          isEditing={isEditing}
          closeSGModal={closeSGModal}
          handleSaveGroup={handleSaveGroup}
        />
      )}
    </Container>
    </>
  );
};

export default ServiceManagement;
