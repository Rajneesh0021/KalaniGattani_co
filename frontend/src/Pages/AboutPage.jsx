import React from 'react';
import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';

const AboutUsContainer = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const PageTitle = styled.h3`
  text-align: left;
  margin-top: 30px;
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

const EmployeesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const EmployeeCard = styled.div`
  flex: 1 1 calc(25% - 20px); /* 4 cards in a row on large screens */
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
    flex-direction: column;
  @media (max-width: 1024px) {
    flex: 1 1 calc(50% - 20px); /* 2 cards in a row on medium screens */
  }

  @media (max-width: 768px) {
    flex: 1 1 100%; /* 1 card in a row on small screens */
  }
`;

const EmployeeImage = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
 
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

const AboutPage = () => {
  return (
    <AboutUsContainer>
      <PageTitle>About Us</PageTitle>
      <SectionWrapper>
        <Title>About Our Company</Title>
        <IntroText>
          At KGC, we are dedicated to providing comprehensive business solutions to help companies
          navigate compliance, legal, and operational challenges. With a focus on efficiency,
          innovation, and client satisfaction, we offer a wide range of services, from regulatory
          compliance to personalized business advisory, ensuring that your business remains agile
          and competitive. Our mission is to empower businesses by streamlining processes and
          providing the expertise needed to thrive in today’s dynamic marketplace. Trust KGC to be
          your partner in success.
        </IntroText>

        <Title>Our Employees</Title>
        <EmployeesGrid>
          <EmployeeCard>
            <EmployeeImage src="https://via.placeholder.com/80" alt="Prakhar" />
            <EmployeeInfo>
              <EmployeeName>Prakhar</EmployeeName>
              <EmployeePosition>Chief Executive Officer</EmployeePosition>
              <LinkedInIcon href="https://www.linkedin.com/in" target="_blank">
                <FaLinkedin />
              </LinkedInIcon>
            </EmployeeInfo>
          </EmployeeCard>

          <EmployeeCard>
            <EmployeeImage src="https://via.placeholder.com/80" alt="Jane Smith" />
            <EmployeeInfo>
              <EmployeeName>Jane Smith</EmployeeName>
              <EmployeePosition>Chief Technology Officer</EmployeePosition>
              <LinkedInIcon href="https://www.linkedin.com/in/janesmith" target="_blank">
                <FaLinkedin />
              </LinkedInIcon>
            </EmployeeInfo>
          </EmployeeCard>

          <EmployeeCard>
            <EmployeeImage src="https://via.placeholder.com/80" alt="John Doe" />
            <EmployeeInfo>
              <EmployeeName>John Doe</EmployeeName>
              <EmployeePosition>Chief Operating Officer</EmployeePosition>
              <LinkedInIcon href="https://www.linkedin.com/in/johndoe" target="_blank">
                <FaLinkedin />
              </LinkedInIcon>
            </EmployeeInfo>
          </EmployeeCard>

          <EmployeeCard>
            <EmployeeImage src="https://via.placeholder.com/80" alt="Emily Davis" />
            <EmployeeInfo>
              <EmployeeName>Emily Davis</EmployeeName>
              <EmployeePosition>Chief Marketing Officer</EmployeePosition>
              <LinkedInIcon href="https://www.linkedin.com/in/emilydavis" target="_blank">
                <FaLinkedin />
              </LinkedInIcon>
            </EmployeeInfo>
          </EmployeeCard>
        </EmployeesGrid>
      </SectionWrapper>
    </AboutUsContainer>
  );
};

export default AboutPage;
