import React, { useState } from 'react';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';

const FAQsContainer = styled.div`
  padding: 0 20px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const BoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 55vh; 
  overflow-y: scroll; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%; /* Full width for inputs */
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%; /* Full width for textarea */
  height: 120px; /* Fixed height for textarea */
  resize: none; /* No resize */
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #311b92;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content; /* Button takes content width */
  align-self: center; /* Align button to the left */
  &:hover {
    background-color: #4527a0;
  }
`;

const InfoBoxBelowForm = styled.div`
  display: flex;
  align-items: center;
  background-color: #e8eaf6;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
`;

const InfoText = styled.p`
  margin-left: 10px;
  font-size: 14px;
  color: #311b92;
`;

const HelpSection = () => {
  const [service, setService] = useState('');
  const [reason, setReason] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Service:', service);
    console.log('Reason:', reason);
    console.log('Issue Description:', issueDescription);
  };

  return (
    <FAQsContainer>
      <SectionTitle>Help</SectionTitle>
      <InfoBox>
        <p>Fill the form below to reach out to us, or connect with us at</p>
      </InfoBox>
      <BoxList>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="service">Select a service</Label>
            <Select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">-- Select a service --</option>
              <option value="Service1">Service 1</option>
              <option value="Service2">Service 2</option>
              <option value="Service3">Service 3</option>
              <option value="Service4">Service 4</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">Select a reason</Label>
            <Select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">-- Select a reason --</option>
              <option value="Delay in process">Delay in process</option>
              <option value="Issue with payment">Issue with payment</option>
              <option value="Service not available">Service not available</option>
              <option value="Others">Others</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="issueDescription">Describe the issue</Label>
            <TextArea
              id="issueDescription"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Please describe your issue in detail..."
            />
          </div>

          <SubmitButton type="submit">Send</SubmitButton>
        </Form>
      </BoxList>
      
      <InfoBoxBelowForm>
        <FaInfoCircle size={24} color="#311b92" />
        <InfoText>You can also write to us at support@kg7c.com with your queries.</InfoText>
      </InfoBoxBelowForm>
    </FAQsContainer>
  );
};

export default HelpSection;
