import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaExclamationTriangle, FaEnvelope } from 'react-icons/fa'; 
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; 

// Styled components (unchanged)
const Container = styled.div`
  padding: 20px;
  background:white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const LeftSection = styled.div`
  text-align: left;
`;

const RightSection = styled.div`
  text-align: right;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const TicketNumber = styled.p`
  color: #555;
`;

const ReportIssue = styled.div`
  display: flex;
  align-items: center;
  color: red;
  cursor: pointer;
  background: #ff00001f;
  svg {
    margin-right: 5px;
  }
`;

const MessageButton = styled.button`
  background-color: #311b92;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #4a39b7;
  }
`;

const ProcessSection = styled.div`
  margin-top: 40px;
`;

const ProcessHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const VerticalLine = styled.div`
  position: relative;
  width: 2px;
  background-color: #ddd;
  height: 100%;
  margin-right: 20px;
`;

const Circle = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: -6px;
  width: 12px;
  height: 12px;
  background-color: ${props => props.isCompleted ? '#311b92' : '#bbb'};
  border-radius: 50%;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const StepDescription = styled.div`
  margin-top: 10px;
  font-size: 16px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  line-height: 1.6;
`;

const PayNowButton = styled.button`
  background-color: #ff9800;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    background-color: #ffa726;
  }
`;

// Main component
const TicketStatusPage = () => {
  const { ticketId } = useParams(); // Extract ticketId from URL
  const [serviceData, setServiceData] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [openSteps, setOpenSteps] = useState([false, false, false, false, false, false]);
  const navigate = useNavigate();

  // Fetch service data based on ticketId and fetch service name from localStorage
  useEffect(() => {
    const fetchServiceData = () => {
      // Get registered services from localStorage
      const registeredServices = JSON.parse(localStorage.getItem('registeredServices'));

      // Find the specific service based on ticketId
      const currentService = registeredServices?.find(service => service.ticketID === parseInt(ticketId));

      // If service is found, update service name and mock data
      if (currentService) {
        setServiceName(currentService.serviceName);
        // Simulate fetching process steps data
        const data = {
          id: ticketId,
          status: 'In Progress',
          process: [
            { title: 'Payment', description: 'Your payment is pending for this service. Click "Pay now" to proceed further.', status: 'Pending', hasButton: true },
            { title: 'Application Filing', status: 'Pending' },
            { title: 'Review by Team', status: 'Pending' },
            { title: 'Approval', status: 'Pending' },
            { title: 'Completion', status: 'Pending' }
          ]
        };
        setServiceData(data);
      } else {
        setServiceName('Service not found'); // Fallback if no service is found
      }
    };

    fetchServiceData();
  }, [ticketId]);

  if (!serviceData) {
    return <p>Loading...</p>;
  }

  const toggleStep = index => {
    setOpenSteps(prev => {
      const newOpenSteps = [...prev];
      newOpenSteps[index] = !newOpenSteps[index];
      return newOpenSteps;
    });
  };

  return (
    <Container>
      <Header>
        <LeftSection>
          <Title>{serviceName}</Title>
        </LeftSection>
        <RightSection>
          <ReportIssue onClick={() => navigate('/profile/help')}>
            <FaExclamationTriangle /> Report an issue
          </ReportIssue>
        </RightSection>
      </Header>
      <TicketNumber>Ticket no {ticketId}</TicketNumber>
      <MessageButton onClick={() => navigate('/message/help')}>
        <FaEnvelope /> Message
      </MessageButton>
      <ProcessSection>
        <ProcessHeading>Process</ProcessHeading>
        {serviceData.process.map((step, index) => (
          <ProcessStep key={index}>
            <VerticalLine>
              <Circle top={index * 20} isCompleted={step.status === 'Completed'} />
            </VerticalLine>
            <StepContent>
              <StepTitle onClick={() => toggleStep(index)}>
                {step.title}
                {openSteps[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </StepTitle>
              <StepDescription isOpen={openSteps[index]}>
                {step.description}
                {step.hasButton && <PayNowButton onClick={() => console.log('Proceed to payment')}>Pay now</PayNowButton>}
              </StepDescription>
            </StepContent>
          </ProcessStep>
        ))}
      </ProcessSection>
    </Container>
  );
};

export default TicketStatusPage;
