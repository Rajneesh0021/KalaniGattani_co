import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import Popup from '../components/Popup'; 
import Swal from 'sweetalert2';

// SweetAlert2 with React
// const MySwal = Swal;

const Container = styled.div`
 padding: 20px ;
  @media (max-width: 900px) {
    padding: 20px 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;

  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 
  text-align: left;
  margin-top: 30px ;
`;

const LeftSection = styled.div`
  text-align: left;
`;

const RightSection = styled.div`
  text-align: right;
`;

const PageTitle = styled.h3`
    text-align: left;
  margin-top: 30px ;
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
  
  margin-bottom: 20px;
  align-items: baseline;
`;

const VerticalLine = styled.div`
 
  width: 2px;
  background-color: #ddd;
  height: 100%;
  margin-right: 20px;
`;

const Circle = styled.div`
 
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
  color: ${props => props.isCompleted ? '#311b92' : '#bbb'};
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

const TicketStatusPage = () => {
  const { ticketId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [openSteps, setOpenSteps] = useState([false, false, false, false, false]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Control Popup visibility
  const [popupTitle, setPopupTitle] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = () => {
      const registeredServices = JSON.parse(localStorage.getItem('registeredServices'));

      const currentService = registeredServices?.find(service => service.ticketID === parseInt(ticketId));

      if (currentService) {
        setServiceName(currentService.serviceName);
        const data = {
          id: ticketId,
          status: 'In Progress',
          process: [
            { title: 'Payment', description: 'Your payment is pending for this service. Click "Pay now" to proceed further.', status: 'Completed', hasButton: true, btntext: 'Pay Now' },
            { title: 'Application Filing', description: 'Please upload the necessary documents to file the application.', status: 'Pending', hasButton: true, btntext: 'Upload Docs', buttonAction: 'fileApplication' },
            { title: 'Review by Team', description: 'Our team is reviewing your submission. You will be notified once the review is complete.', status: 'Pending' },
            { title: 'Approval', description: 'Your application is under approval. You will be informed of the outcome.', status: 'Pending' },
            { title: 'Completion', description: 'Your service request will be marked as completed once all steps are done.', status: 'Pending' }
          ]
        };
        setServiceData(data);
      } else {
        setServiceName('Service not found');
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

  // Handle step actions
  const handleStepAction = (action) => {
    if (action === 'fileApplication') {
      setPopupTitle(`${serviceName} Docs Application`);
      setIsPopupOpen(true); 
    } else if (action === 'payment') {
      navigate(`/paynow/${ticketId}`)
    }
  };

  const handlePopupSubmit = (formData) => {
    Swal.fire('Documents submitted');
    setIsPopupOpen(false); 
  };

  return (
    <Container>
      <Header>
        <LeftSection>
          <PageTitle>{serviceName}</PageTitle>
        </LeftSection>
        <RightSection>
          <ReportIssue onClick={() => navigate(`/profile/help`)}>
            <FaExclamationTriangle /> Report an issue
          </ReportIssue>
        </RightSection>
      </Header>
      <TicketNumber>Ticket no {ticketId}</TicketNumber>
      <MessageButton onClick={() => navigate(`/message/${ticketId}`)}>
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
              <StepTitle onClick={() => toggleStep(index)} isCompleted={step.status === 'Completed'}>
                {step.title}
                {openSteps[index] ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </StepTitle>
              <StepDescription isOpen={openSteps[index]}>
                {step.description}
                {step.hasButton && <PayNowButton onClick={() => handleStepAction(step.buttonAction || 'payment')}>{step.btntext}</PayNowButton>}
              </StepDescription>
            </StepContent>
          </ProcessStep>
        ))}
      </ProcessSection>

      {/* Popup component */}
      <Popup
        title={popupTitle}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handlePopupSubmit}
      />
    </Container>
  );
};

export default TicketStatusPage;
