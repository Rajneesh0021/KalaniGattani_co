// pages/Home.js
'use client'
import React from 'react';
import styled from 'styled-components';
import HomeSectionOne from './components/HomeSectionOne';
import SideSectionTwo from './components/SideSectionTwo';

const HomeContainer = styled.div`
  padding: 20px 20px 20px 0;
  @media (max-width: 900px) {
    padding: 20px 0;
  }
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




const Home = () => {
  return (
    <HomeContainer>
      <PageTitle>Home</PageTitle>
      <SectionsWrapper>
        <HomeSectionOne/>
        <SideSectionTwo/>
      </SectionsWrapper>
    </HomeContainer>
  );
};

export default Home;
