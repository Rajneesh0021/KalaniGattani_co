// pages/MessagePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
`;

const Title = styled.h1`

  margin-top: 40px;
  color: #311b92;
`;

const MessageWrapper = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MessageTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: #3e19e2;
`;

const MessageText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const Date = styled.p`
  font-size: 14px;
  color: #666;
`;

const MessagePage = () => {
  const { ticketId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Mock API call for messages
      const data = [
        {
          id: 1,
          title: 'Payment Confirmation',
          message: 'Your payment has been successfully received.',
          date: '2024-09-01',
        },
        {
          id: 2,
          title: 'Document Verification',
          message: 'Your PAN card documents are under verification. Please check back later for status updates.',
          date: '2024-09-02',
        },
      ];
      setMessages(data);
    };

    fetchMessages();
  }, [ticketId]);

  return (
    <Container>
      <Title>Messages for Ticket ID: {ticketId}</Title>
      {messages.map((msg) => (
        <MessageWrapper key={msg.id}>
          <MessageTitle>{msg.title}</MessageTitle>
          <MessageText>{msg.message}</MessageText>
          <Date>Date: {msg.date}</Date>
        </MessageWrapper>
      ))}
    </Container>
  );
};

export default MessagePage;
