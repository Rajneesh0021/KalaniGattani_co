import React, { useState } from 'react';
import styled from 'styled-components';
import Home from './ConsultantHome';
import Chats from './ConsultantChats';
import UserInfo from './UserInfo';
import UserDocs from './UserDocs';

const ConsultantDashboard = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'chats':
        return <Chats />;
      case 'userInfo':
        return <UserInfo />;
      case 'userDocs':
        return <UserDocs />;
     
      default:
        return <Home />;
    }
  };
const logout=()=>{
  localStorage.removeItem('token');
}
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarOption onClick={() => setActivePage('home')}>Home</SidebarOption>
        <SidebarOption onClick={() => setActivePage('chats')}>Chats</SidebarOption>
        <SidebarOption onClick={() => setActivePage('userInfo')}>User Info</SidebarOption>
        <SidebarOption onClick={() => setActivePage('userDocs')}>User Docs</SidebarOption>
        <SidebarOption onClick={() => logout}>Logout</SidebarOption>
      </Sidebar>
      <Content>{renderPage()}</Content>
    </DashboardContainer>
  );
};

export default ConsultantDashboard;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #333;
  color: white;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
`;

const SidebarOption = styled.div`
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: #555;
  }
  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;
