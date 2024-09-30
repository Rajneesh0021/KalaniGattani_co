import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ServiceManagement from './components/ServicesList';


const AdminServicesContainer = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;


const AdminServices = () => {


  return (
    <AdminServicesContainer>
    

      <ServiceManagement  />
    
    </AdminServicesContainer>
  );
};

export default AdminServices;
