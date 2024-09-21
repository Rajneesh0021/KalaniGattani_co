import React, { useState } from 'react';
import styled from 'styled-components';
import AddServiceModal from './AddServiceModal'; // Assuming you have a modal component for editing

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
  // Dummy data for services and service groups
  const initialServices = [
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
  ];

  const initialServiceGroups = [
    { id: 1, name: 'Service Group 1' },
    { id: 2, name: 'Service Group 2' },
    { id: 3, name: 'Service Group 3' },
  ];

  const [services, setServices] = useState(initialServices);
  const [serviceGroups, setServiceGroups] = useState(initialServiceGroups);
  const [searchServiceTerm, setSearchServiceTerm] = useState('');
  const [searchServiceGroupTerm, setSearchServiceGroupTerm] = useState('');
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filtered services based on search term
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchServiceTerm.toLowerCase())
  );

  const filteredServiceGroups = serviceGroups.filter(group =>
    group.name.toLowerCase().includes(searchServiceGroupTerm.toLowerCase())
  );

  const handleEditService = (service) => {
    setEditService(service);
    setShowModal(true); // Open modal on edit
  };

  const handleDeleteService = (id, isGroup = false) => {
    if (isGroup) {
      setServiceGroups(serviceGroups.filter(group => group.id !== id));
    } else {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleSaveService = (updatedService) => {
    setServices(services.map(service =>
      service.id === updatedService.id ? updatedService : service
    ));
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
                <ActionButton className="edit" onClick={() => handleEditService(group)}>
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

     

      {/* Modal for editing */}
      {showModal && (
        <AddServiceModal
          showModal={showModal}
          isEditing={true}
          service={editService}
          handleSaveService={handleSaveService}
        />
      )}
    </Container>
  );
};

export default ServiceManagement;
