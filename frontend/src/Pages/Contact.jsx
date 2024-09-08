import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const ServicesContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h3`
  text-align: left;
  margin-top: 30px;
  font-size: 36px;
`;

const SectionWrapper = styled.div`
  margin-top: 2em;
  background-color: #f9f9f9;
  padding: 2em;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: -5px 5px 38px #d9d9d9, 5px -5px 38px #ffffff;
  text-align: left;
`;

const Title = styled.h3`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: left;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
   gap:10px;
  @media (max-width: 620px) {
    flex-direction:column;
    width:100%;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoIcon = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
  color: #311b92;
`;

const InfoText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputField = styled.input`
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  height: 150px;
`;

const SubmitButton = styled.button`
  padding: 15px;
  font-size: 18px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3e19e2;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Your message has been sent!');
  };

  return (
    <ServicesContainer>
      <PageTitle>Contact Us</PageTitle>
      <SectionWrapper>
        <Title>Get in Touch</Title>
        <Description>
          We’d love to hear from you! Whether you have a question about services, pricing, or anything else, our team is ready to answer all your questions.
        </Description>

        <ContactInfo>
          <InfoBox>
            <InfoIcon><FaPhone /></InfoIcon>
            <InfoText>+123 456 7890</InfoText>
            <Description>Call us for immediate assistance</Description>
          </InfoBox>

          <InfoBox>
            <InfoIcon><FaEnvelope /></InfoIcon>
            <InfoText>info@kgc.com</InfoText>
            <Description>Email us for any inquiries</Description>
          </InfoBox>

          <InfoBox>
            <InfoIcon><FaMapMarkerAlt /></InfoIcon>
            <InfoText>1234 Business Ave</InfoText>
            <Description>Visit us at our office</Description>
          </InfoBox>
        </ContactInfo>

        <Title>Send Us a Message</Title>
        <Description>Fill out the form below, and we’ll get back to you as soon as possible.</Description>

        <FormWrapper onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </FormWrapper>
      </SectionWrapper>
    </ServicesContainer>
  );
};

export default Contact;
