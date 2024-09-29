import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import axios for API requests
import AddServiceModal from './AddServiceModal'; 
import AddServiceGroupModal from './AddServiceGroup';

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

// Component
const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [searchServiceTerm, setSearchServiceTerm] = useState('');
  const [searchServiceGroupTerm, setSearchServiceGroupTerm] = useState('');
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSGModal, setShowSGModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/service'); // Adjust the endpoint
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchServiceGroups = async () => {
      try {
        const response = await axios.get('/api/service-groups'); // Adjust the endpoint
        setServiceGroups(response.data);
      } catch (error) {
        console.error('Error fetching service groups:', error);
      }
    };

    fetchServices();
    fetchServiceGroups();
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchServiceTerm.toLowerCase())
  );

  const filteredServiceGroups = serviceGroups.filter(group =>
    group.name.toLowerCase().includes(searchServiceGroupTerm.toLowerCase())
  );

  const handleEditService = (service) => {
    setEditService(service);
    setShowModal(true);
  };

  const handleEditSG = () => {
    setShowSGModal(true);
  };

  const handleDeleteService = async (id, isGroup = false) => {
    try {
      if (isGroup) {
        await axios.delete(`/api/service-groups/${id}`); // Adjust the endpoint
        setServiceGroups(serviceGroups.filter(group => group.id !== id));
      } else {
        await axios.delete(`/api/services/${id}`); // Adjust the endpoint
        setServices(services.filter(service => service.id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleSaveService = async (updatedService) => {
    try {
      const response = await axios.put(`/api/services/${updatedService.id}`, updatedService); // Adjust the endpoint
      setServices(services.map(service =>
        service.id === updatedService.id ? response.data : service
      ));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleSaveGroup = async (groupData) => {
    try {
      const response = await axios.post('/api/service-groups', groupData); // Adjust the endpoint
      setServiceGroups((prevGroups) => [...prevGroups, response.data]);
      setShowSGModal(false);
    } catch (error) {
      console.error('Error adding service group:', error);
    }
  };

  const closeSGModal = () => {
    setShowSGModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
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
                <ActionButton className="edit" onClick={() => handleEditSG(group)}>
                  Edit
                </ActionButton>
                <ActionButton className="delete" onClick={() => handleDeleteService(group.id, true)}>
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
                <ActionButton className="delete" onClick={() => handleDeleteService(service.id)}>
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
          isEditing={true}
          service={editService}
          closeModal={closeModal}
          handleSaveService={handleSaveService}
        />
      )}

      {/* Modal for adding service group */}
      {showSGModal && (
        <AddServiceGroupModal
          showSGModal={showSGModal} 
          closeSGModal={closeSGModal}
          handleSaveGroup={handleSaveGroup}
        />
      )}
    </Container>
  );
};

export default ServiceManagement;
