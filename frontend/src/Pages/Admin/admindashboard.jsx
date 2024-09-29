import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaServicestack, FaUserFriends, FaUser, FaComments, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Home from './AdminHome';
import Services from './AdminServices';
import Consultants from './AdminConsultant';
import Users from './AdminUsers';
import Chats from './AdminChats';
import Profile from './AdminProfiles';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Sidebar styling
const Sidebar = styled.div`
  width: 15%;
  background-color: #311b92;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

// Main content styling
const MainContent = styled.div`
  width: 85%;
  padding: 20px;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 0 0 0; 
  }
`;

// Sidebar link styling
const SidebarLink = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #4527a0;
  }

  svg {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 5px;
    font-size: 0;

    svg {
      margin-right: 0;
      font-size: 24px;
    }
  }
`;

// Logout button styling
const LogoutButton = styled.div`
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: auto;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff7961;
  }

  @media (max-width: 768px) {
    font-size: 0;
    
    svg {
      font-size: 24px;
    }
  }
`;

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('home');

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'services':
        return <Services />;
      case 'consultants':
        return <Consultants />;
      case 'users':
        return <Users />;
      case 'chats':
        return <Chats />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarLink onClick={() => handleNavigation('home')}>
          <FaHome /> <span>Home</span>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('services')}>
          <FaServicestack /> <span>Services</span>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('consultants')}>
          <FaUserFriends /> <span>Consultants</span>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('users')}>
          <FaUser /> <span>Users</span>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('chats')}>
          <FaComments /> <span>Chats</span>
        </SidebarLink>
        <SidebarLink onClick={() => handleNavigation('profile')}>
          <FaUserCircle /> <span>Profile</span>
        </SidebarLink>
        <LogoutButton>
          <FaSignOutAlt /> <span>Logout</span>
        </LogoutButton>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {renderComponent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
