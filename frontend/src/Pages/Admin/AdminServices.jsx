import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddServiceModal from './components/AddServiceModal';
import AddServiceGroupModal from './components/AddServiceGroup';
import ServiceManagement from './components/ServicesList';


const AdminServicesContainer = styled.div`
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

// Main Component
const AdminServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Service 1' },
    { id: 2, name: 'Service 2' },
    { id: 3, name: 'Service 3' },
  ]);
  const [filteredServices, setFilteredServices] = useState(services);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [showSGModal, setShowSGModal] = useState(false);
  // State for New Service Details (Lifting state for modal fields)
  const [newServiceName, setNewServiceName] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [professionalFees, setProfessionalFees] = useState('');

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleAddService = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewServiceName(''); 
  };

  const handleEditService = (service) => {
    setShowModal(true);
    setIsEditing(true);
    setCurrentService(service);
    setNewServiceName(service.name); 
  };

  const handleDeleteService = (serviceId) => {
    const updatedServices = services.filter((service) => service.id !== serviceId);
    setServices(updatedServices);
  };

  const handleSaveService = (serviceData) => {
    // Logic to handle the service data, e.g., sending it to an API or updating state
    console.log("Service Data:", serviceData);
  };
  // Close Modal Function
  const closeModal = () => {
    setShowModal(false);
  };


  const handleSaveGroup = (groupData) => {
    console.log('Service Group Data:', groupData);
    
    setShowSGModal(false);
  };
  return (
    <AdminServicesContainer>
      <Header>
        <Title>Services</Title>
        <div>  <AddServiceButton onClick={() => setShowSGModal(true)}>Add Service Group</AddServiceButton>   <AddServiceButton onClick={handleAddService}>Add Service</AddServiceButton> </div>
     
      </Header>

      <ServiceManagement/>
      {showModal && (
        <AddServiceModal
          showModal={showModal}
          closeModal={closeModal}
          title={isEditing ? 'Edit Service' : 'Add Service'}
          handleSaveService={handleSaveService}
          isEditing={isEditing}
          newServiceName={newServiceName}
          setNewServiceName={setNewServiceName}
          heading={heading}
          setHeading={setHeading}
          description={description}
          setDescription={setDescription}
          benefits={benefits}
          setBenefits={setBenefits}
          professionalFees={professionalFees}
          setProfessionalFees={setProfessionalFees}
        />
      )}
     <AddServiceGroupModal
        showSGModal={showSGModal} // Renamed here
        closeModal={() => setShowSGModal(false)}
        handleSaveGroup={handleSaveGroup}
      />
      
    </AdminServicesContainer>
  );
};

export default AdminServices;
