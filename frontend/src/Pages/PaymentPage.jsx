// pages/PaymentPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;

  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
`;

const Title = styled.h3`
  text-align: left;
  margin-top: 30px ;
`;

const PaymentWrapper = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PaymentTitle = styled.h3`
  
  margin-bottom: 10px;
  color: #3e19e2;
`;

const PaymentInfo = styled.p`
  
  margin-bottom: 5px;
`;

const PaymentPage = () => {
  const { ticketId } = useParams();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      // Mock API call for payment details
      const data = {
        id: ticketId,
        amount: '1500',
        status: 'Completed',
        transactionId: 'TXN123456789',
        date: '2024-09-01',
        paymentMethod: 'Credit Card',
      };
      setPaymentData(data);
    };

    fetchPaymentData();
  }, [ticketId]);

  if (!paymentData) {
    return <p>Loading payment details...</p>;
  }

  const { amount, status, transactionId, date, paymentMethod } = paymentData;

  return (
    <Container>
      <Title>Payment Details for Ticket ID: {ticketId}</Title>
      <PaymentWrapper>
        <PaymentTitle>Amount Paid: ₹{amount}</PaymentTitle>
        <PaymentInfo><strong>Status:</strong> {status}</PaymentInfo>
        <PaymentInfo><strong>Transaction ID:</strong> {transactionId}</PaymentInfo>
        <PaymentInfo><strong>Payment Method:</strong> {paymentMethod}</PaymentInfo>
        <PaymentInfo><strong>Date:</strong> {date}</PaymentInfo>
      </PaymentWrapper>
    </Container>
  );
};

export default PaymentPage;
