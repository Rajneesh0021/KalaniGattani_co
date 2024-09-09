// pages/Home.js
import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import SideSectionTwo from '../components/SideSectionTwo';
import ExServices from '../components/Ex-Services';

const HomeContainer = styled.div`
  padding: 20px 0;
  
`;

const PageTitle = styled.h3`
  text-align: left;
  margin-top: 30px ;
`;

const SectionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;




const ExploreServices = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  return (
    <HomeContainer>
      <PageTitle>Home | Explore Services</PageTitle>
      <SectionsWrapper>
        <ExServices type={type}/>
        <SideSectionTwo/>
      </SectionsWrapper>
    </HomeContainer>
  );
};

export default ExploreServices;
