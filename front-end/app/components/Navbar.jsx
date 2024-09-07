import React, { useState, useContext, useEffect, useRef } from 'react';
import './css/Navbar.css';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import LoginSignupPop from './LoginSignupPop';
import SubMenu from './SubMenu';

const NavbarContainer = styled.div`
  position: fixed;
  height: 4em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  color: black;
  z-index: 1;
`;

const UserIcon = styled(FaUser)`
  font-size: 24px;
  cursor: pointer;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  width: 15%;
  z-index: 9;
  background-color: black;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  border-radius: 20px;
  color: white;
  @media (max-width: 1186px) {
    width: 25%;
  }
  @media (max-width: 768px) {
    width: 30%;
  }
  @media (max-width: 580px) {
    width: 70%;
  }
`;

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext
  const [showLogin, setShowLogin] = useState(false); // For login popup
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // For profile dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== 'user-icon'
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer>
      <div className="logo">Kalani Gattani & co</div>
      <div className="circlecover">
        {isLoggedIn ? (
          <div>
            <UserIcon id="user-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)} />
            {showProfileDropdown && (
              <ProfileDropdown ref={dropdownRef}>
                <SubMenu />
              </ProfileDropdown>
            )}
          </div>
        ) : (
          <UserIcon onClick={() => setShowLogin(!showLogin)} />
        )}
      </div>
      {showLogin && !isLoggedIn && <LoginSignupPop />}
    </NavbarContainer>
  );
};

export default Navbar;
