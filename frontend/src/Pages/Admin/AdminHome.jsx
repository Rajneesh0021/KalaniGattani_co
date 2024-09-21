
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Example data fetching (replace with real API call)
const fetchData = () => {
  return {
    services: 12,
    users: { total: 50, active: 40, inactive: 10 },
    consultants: 8,
  };
};

// Styled-components
const AdminHomeContainer = styled.div`
  padding: 20px;
  background-color: #f4f6f9;
  min-height: 90vh;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
`;

const Count = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: #311b92;
`;

const SubCount = styled.p`
  font-size: 14px;
  color: #666;
`;

const AdminHome = () => {
  const [data, setData] = useState({
    services: 0,
    users: { total: 0, active: 0, inactive: 0 },
    consultants: 0,
  });

  useEffect(() => {
    // Simulate fetching data
    const fetchedData = fetchData();
    setData(fetchedData);
  }, []);

  return (
    <AdminHomeContainer>
      <h1>Admin Dashboard</h1>
      <CardsGrid>
        <Card>
          <CardTitle>Services</CardTitle>
          <Count>{data.services}</Count>
        </Card>

        <Card>
          <CardTitle>Users</CardTitle>
          <Count>{data.users.total}</Count>
          <SubCount>Active: {data.users.active}</SubCount>
          <SubCount>Inactive: {data.users.inactive}</SubCount>
        </Card>

        <Card>
          <CardTitle>Consultants</CardTitle>
          <Count>{data.consultants}</Count>
        </Card>
      </CardsGrid>
    </AdminHomeContainer>
  );
};

export default AdminHome;
