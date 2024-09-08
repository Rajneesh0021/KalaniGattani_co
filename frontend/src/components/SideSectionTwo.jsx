import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import LoginSignupPop from './LoginSignupPop';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext

const SectionTwo = styled.div`
  flex: 0 0 30%;
  padding: 20px;
  border-radius: 15px;
  background: white;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 20em;
  position: sticky;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-image: url('./assets/nonLoginComplaince.svg');
  background-size: cover;
  background-position: center;

  @media (max-width: 900px) {
    border: 1px solid;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  position: relative;
`;

const Text = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #311b92;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3e19e2;
  }
`;

const WelcomeText = styled.h2`
  font-size: 24px;
  color: #311b92;
`;

const SideSectionTwo = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext); // Access auth context

  return (
    <>
      <SectionTwo>
        <Content>
          {isLoggedIn ? (
            <WelcomeText>Welcome, {user?.name || 'User'}!</WelcomeText> // Show welcome message if logged in
          ) : (
            <>
              <Text>Stay penalty free by knowing all your upcoming compliances</Text>
              <Button onClick={() => setShowLogin(!showLogin)}>Login / SignUp</Button>
            </>
          )}
        </Content>
      </SectionTwo>

      {showLogin && !isLoggedIn && <LoginSignupPop />} {/* Show login popup if not logged in */}
    </>
  );
};

export default SideSectionTwo;
