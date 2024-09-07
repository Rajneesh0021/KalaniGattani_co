// pages/Contact.jsx

import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const ServicesContainer = styled.div`
  padding: 20px 0;
  text-align: center;
`;
const PageTitle = styled.h3`
  text-align: left;
margin-top: 30px ;
`;
const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
  text-align:left;
`;
const TitleMiddle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
 
`;
const SectionWrapper = styled.div`

  margin-top: 2em;
  background-color: #f0f0f0;
  padding :2em;
 border-radius: 15px;
background: #ffffff;
box-shadow:  -5px 5px 38px #d9d9d9,
             5px -5px 38px #ffffff;
`;
const ImageSection = styled.div`

  // display: flex;
  // justify-content: center;
  width:50%;
  padding: 20px;
  margin: auto;
  @media (max-width: 768px) {
   
    width: 100%;
   
  }
`;

const Image = styled.img`
  max-width: 60%;

  border-radius: 10px;
`;

const NoServicesMessage = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const ExploreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;

margin:2em auto;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonText = styled.span`
  margin-right: 10px;
`;

const Contact = () => {
  return (
    <ServicesContainer>
      <PageTitle>Contact Us</PageTitle>
      <SectionWrapper>
      <ImageSection>
        <Image src="./assets/not_found.svg" alt="Services" />
      </ImageSection>

      <TitleMiddle>No services to show here</TitleMiddle>
      <NoServicesMessage>Login or Signup to add your services</NoServicesMessage>

      <ExploreButton>
        <ButtonText>Explore services</ButtonText>
        <FaArrowRight />
      </ExploreButton>
      </SectionWrapper> 
    </ServicesContainer>
  );
};

export default Contact;

