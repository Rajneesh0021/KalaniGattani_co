// pages/Compliances.jsx
import React from 'react';
import styled from 'styled-components';
import SideSectionTwo from '../components/SideSectionTwo';
import Empty from '../components/Empty';

const ComplianceContainer = styled.div`
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionOne = styled.div`
  flex: 0 0 70%;
  padding: 20px;
  margin-right: 20px;
border-radius: 15px;
background: #ffffff;
box-shadow:  -5px 5px 38px #d9d9d9,
             5px -5px 38px #ffffff;
  align-item:center;

   @media (max-width: 768px) {
    margin-right: 0;
  }
`;


const Compliances = () => {
  return (
    <ComplianceContainer>
    <PageTitle>Compliances</PageTitle>
    <SectionsWrapper>
      <SectionOne>
      <Empty Title={'No compliances to show here'} desc={'Add your existing business to avoid penalty in upcoming months'} btnText={'+   Add New/Existing Business'} imgPath={'./assets/emptyCompliances.svg'}/>
      </SectionOne>
      <SideSectionTwo/>
    </SectionsWrapper>
  </ComplianceContainer>
  )
};

export default Compliances;


