import React, { useState } from 'react';
import styled from 'styled-components';
import LoginSignupPop from './LoginSignupPop';

const SectionTwo = styled.div`
  flex: 0 0 30%;
  padding: 20px;
  border-radius: 15px;
  background: white;
  // box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
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
    border:1px solid;

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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SideSectionTwo = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <SectionTwo>
      <Content>
        <Text>Stay penalty free by knowing all your upcoming compliances</Text>
        <Button onClick={() => setShowLogin(!showLogin)}>Login / SignUp</Button>
       
      </Content>
      
    </SectionTwo>
    {showLogin && (
        <LoginSignupPop/>
      )}
    </>
  );
};

export default SideSectionTwo;
