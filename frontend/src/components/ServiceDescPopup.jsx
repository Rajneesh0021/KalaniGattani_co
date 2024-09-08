import React, { useState,useContext } from 'react';
import { MdClose, MdInfoOutline } from 'react-icons/md'; 
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import Swal from 'sweetalert2';
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(MdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const FeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Fee = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const InfoIcon = styled(MdInfoOutline)`
  font-size: 20px;
  cursor: pointer;
`;

const InfoPopup = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 12px;
`;

const UsersRegistered = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const WatchVideo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
`;

const VideoIcon = styled.span`
  font-size: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.active ? '#007bff' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ContentBox = styled.div`
  max-height: 150px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-top: 15px;
  font-size: 14px;
`;

const RegisterButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;
`;

const VideoPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
`;

const IframeWrapper = styled.div`
  width: 90%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  margin:auto;
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
`;

const PopupTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const FeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
`;

const HrLine = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;
const ServiceDescPopup = ({ selectedService, setSelectedService }) => {
  const { isLoggedIn } = useContext(AuthContext); 

  const [activeTab, setActiveTab] = useState('overview');
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const closePopup = () => {
    setSelectedService(null);
  };

  const toggleInfoPopup = () => {
    setShowInfoPopup(!showInfoPopup);
  };

  const openVideoPopup = () => {
    setShowVideoPopup(true);
  };

  const closeVideoPopup = () => {
    setShowVideoPopup(false);
  };

  // Function to generate a random ticket ID
  const generateRandomTicketID = () => {
    return Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
  };

  // Handle register button click
  const handleRegisterClick = () => {
    const ticketID = generateRandomTicketID();
    const serviceData = {
      serviceName: selectedService.text,
      ticketID,
      status:'ongoing'
    };
  
    // Retrieve existing registered services from localStorage or initialize an empty array
    const existingServices = JSON.parse(localStorage.getItem('registeredServices')) || [];
  
    // Add the new service to the array
    const updatedServices = [...existingServices, serviceData];
  
    // Store the updated array in localStorage
    localStorage.setItem('registeredServices', JSON.stringify(updatedServices));
  
    Swal.fire({
      title: 'Registration Successful!',
      text: `Service Registered! Ticket ID: ${ticketID}`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4caf50',
    });
  };
  

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <>
          <strong>Benefits</strong>
          <p>1. Become compliant, reduce indirect taxes, and grow your business.</p>
          <p>2. You can open a current account easily with GST.</p>
          <strong>Description</strong>
          <p>
            Every business or corporation that buys and sells goods or services has to register for GST if they
            cross the threshold. The threshold limit is Rs.40 lakhs for goods and Rs.20 lakhs for services in
            normal states. Those involved in inter-state or e-commerce sectors have to register under GST mandatorily.
          </p>
        </>
      );
    } else if (activeTab === 'documents') {
      return (
        <>
          <strong>Documents required</strong>
          <p>1. Company PAN number</p>
          <p>2. Certificate of Incorporation</p>
          <p>3. Board Resolution</p>
          <p>4. All directors'/partners' PAN, photo, email ID & mobile number</p>
          <p>5. DSC of the Authorized Director</p>
          <strong>Deliverables</strong>
          <p>1. GSTIN Number, HSN and SAC Code</p>
          <p>2. Provisional GST login credentials</p>
        </>
      );
    }
  };

  return (
    <>
      <PopupOverlay>
        <Popup>
          <CloseButton onClick={closePopup} />

          <Header>
            <Title>{selectedService.text}</Title>
            <FeeInfo>
              <Fee>₹900</Fee>
              <InfoIcon onClick={toggleInfoPopup} />
            </FeeInfo>
            {showInfoPopup && (
              <InfoPopup>
                <PopupTitle>Pricing</PopupTitle>
                <FeeRow>
                  <span>Professional Fees</span>
                  <span>₹338</span>
                </FeeRow>
                <FeeRow>
                  <span>GST</span>
                  <span>₹61</span>
                </FeeRow>
                <HrLine />
                <FeeRow>
                  <strong>Total</strong>
                  <strong>₹399</strong>
                </FeeRow>
              </InfoPopup>
            )}
          </Header>

          <UsersRegistered>35,794+ users registered</UsersRegistered>
          <Divider />

          <WatchVideo onClick={openVideoPopup}>
            <VideoIcon>🎥</VideoIcon>
            Watch video
          </WatchVideo>

          <ButtonGroup>
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
              Overview
            </TabButton>
            <TabButton active={activeTab === 'documents'} onClick={() => setActiveTab('documents')}>
              Process & Documents
            </TabButton>
          </ButtonGroup>

          <ContentBox>{renderContent()}</ContentBox>

          <RegisterButton onClick={()=>{ if(isLoggedIn){handleRegisterClick()}else{alert('Loggin to Register')}}}>Register</RegisterButton>
        </Popup>
      </PopupOverlay>

      {showVideoPopup && (
        <PopupOverlay onClick={closeVideoPopup}>
          <VideoPopup onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeVideoPopup} />
            <IframeWrapper>
              <Iframe
                src="https://www.youtube.com/embed/0kKLv--xqCs"
                title="YouTube video"
                allowFullScreen
              />
            </IframeWrapper>
          </VideoPopup>
        </PopupOverlay>
      )}
    </>
  );
};

export default ServiceDescPopup;