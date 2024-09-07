import React from 'react';
import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';

const AboutUsContainer = styled.div`
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
  text-align: left;
`;

const SectionWrapper = styled.div`
  margin-top: 2em;
  background-color: #f0f0f0;
  padding: 2em;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
`;

const IntroText = styled.p`
  text-align: left;
  font-size: 18px;
  line-height: 1.6;
`;

const EmployeesSection = styled.div`
  margin-top: 3em;
  text-align: left;
`;

const EmployeeCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
`;

const EmployeeImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.h4`
  font-size: 20px;
  margin: 0;
`;

const EmployeePosition = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const LinkedInIcon = styled.a`
  color: #0077b5;
  margin-top: 5px;
  font-size: 24px;
`;

const About = () => {
  return (
    <AboutUsContainer>
      <PageTitle>About Us</PageTitle>
      <SectionWrapper>
      <Title>About Our Company</Title>
        <IntroText>
          Welcome to YourHR, a leading job search service designed to help job seekers
          find their perfect job roles based on qualifications and preferences. Our platform
          leverages cutting-edge technology to connect professionals with opportunities that align
          with their skills and career aspirations. We aim to simplify the job-hunting process and
          empower individuals by providing the tools they need to succeed.
        </IntroText>
        <Title>Our Employees</Title>
        <EmployeeCard>
          <EmployeeImage src="https://via.placeholder.com/80" alt="Employee Name" />
          <EmployeeInfo>
            <EmployeeName>John Doe</EmployeeName>
            <EmployeePosition>Chief Executive Officer</EmployeePosition>
            <LinkedInIcon href="https://www.linkedin.com/in" target="_blank">
              <FaLinkedin />
            </LinkedInIcon>
          </EmployeeInfo>
        </EmployeeCard>

        <EmployeeCard>
          <EmployeeImage src="https://via.placeholder.com/80" alt="Employee Name" />
          <EmployeeInfo>
            <EmployeeName>Jane Smith</EmployeeName>
            <EmployeePosition>Chief Technology Officer</EmployeePosition>
            <LinkedInIcon href="https://www.linkedin.com/in/janesmith" target="_blank">
              <FaLinkedin />
            </LinkedInIcon>
          </EmployeeInfo>
        </EmployeeCard>

      </SectionWrapper>

      <EmployeesSection>
       
        {/* Add more employees as needed */}
      </EmployeesSection>
    </AboutUsContainer>
  );
};

export default About;
