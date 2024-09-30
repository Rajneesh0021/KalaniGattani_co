// Sidebar.js
import React from 'react';
import { FaHome, FaList, FaCalendarAlt, FaInfoCircle, FaEnvelope} from 'react-icons/fa';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 10%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #311B92;
  padding:60px 10px 10px 10px;
  position: fixed;
  top: 0;
  left: 0;
  // z-index:9
  @media (max-width: 768px) {
    flex-direction: row;
    height: 60px;
    width: 100%;
    bottom: 0;
    top: auto;
    justify-content: space-around;
    padding:0;
  }
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
  color: white;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: row;
    font-size: 24px;
  }

  &:hover {
    color: #61dafb;
  }
`;

const SidebarText = styled.span`
  margin-top: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });


  return (
    <SidebarContainer>
      <SidebarItem to="/">
        <FaHome />
        {isLaptop && <SidebarText>Home</SidebarText>}
      </SidebarItem>
      <SidebarItem to="/services">
        <FaList />
        {isLaptop && <SidebarText>Services</SidebarText>}
      </SidebarItem>
      <SidebarItem to="/compliances">
        <FaCalendarAlt />
        {isLaptop && <SidebarText>Compliances</SidebarText>}
      </SidebarItem>
      <SidebarItem to="/about">
        <FaInfoCircle />
        {isLaptop && <SidebarText>About</SidebarText>}
      </SidebarItem>
      <SidebarItem to="/contact">
        <FaEnvelope />
        {isLaptop && <SidebarText>Contact</SidebarText>}
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
