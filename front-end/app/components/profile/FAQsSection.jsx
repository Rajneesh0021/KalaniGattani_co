import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
  gap: 10px;
  height: 55vh; /* Set height to 80vh */
  overflow-y: auto; /* Make it scrollable */
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #311b92;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #4527a0;
  }
`;

const BoxText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DetailedSection = styled.div`
  padding: 0;
`;

const DropdownBox = styled.div`
  margin: 10px 0;
  background-color: #e8eaf6;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
`;

const DropdownText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #311b92;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #311b92;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #4527a0;
  }
`;

const DetailedContent = styled.div`
  height: 55vh; /* Set height to 80vh */
  overflow-y: auto; /* Make it scrollable */
`;

const FAQsSection = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { id: 1, name: 'My Services' },
    { id: 2, name: 'Account Information' },
    { id: 3, name: 'Billing & Payments' },
    { id: 1, name: 'My Services' },
    { id: 2, name: 'Account Information' },
    { id: 3, name: 'Billing & Payments' },
    { id: 1, name: 'My Services' },
    { id: 2, name: 'Account Information' },
    { id: 3, name: 'Billing & Payments' },
    { id: 1, name: 'My Services' },
    { id: 2, name: 'Account Information' },
    { id: 3, name: 'Billing & Payments' },
  ];

  const handleBoxClick = (topic) => {
    setSelectedTopic(topic);
    setShowDetails(true);
  };

  const handleDropdownClick = (index) => {
    const details = [...selectedTopic.details];
    details[index].open = !details[index].open;
    setSelectedTopic({ ...selectedTopic, details });
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  return (
    <FAQsContainer>
      {!showDetails ? (
        <>
          <SectionTitle>FAQs</SectionTitle>
          <InfoBox>
            <p>Choose the topic where you need help</p>
          </InfoBox>
          <div>
            <BoxList>
              {topics.map((topic) => (
                <Box
                  key={topic.id}
                  onClick={() =>
                    handleBoxClick({
                      ...topic,
                      details: [
                        { question: 'How can I manage my services?', open: false },
                        { question: 'What services do I have?', open: false }
                      ]
                    })
                  }
                >
                  <BoxText>{topic.name}</BoxText>
                  <FaArrowRight />
                </Box>
              ))}
            </BoxList>
          </div>
        </>
      ) : (
        <DetailedSection>
          <BackButton onClick={handleGoBack}>
            <FaArrowLeft /> Back
          </BackButton>
          <h3>{selectedTopic.name}</h3>
          <DetailedContent>
            {selectedTopic.details.map((detail, index) => (
              <DropdownBox key={index} onClick={() => handleDropdownClick(index)}>
                <DropdownText>{detail.question}</DropdownText>
                {detail.open && <p>Here is a detailed explanation about the topic.</p>}
              </DropdownBox>
            ))}
          </DetailedContent>
        </DetailedSection>
      )}
    </FAQsContainer>
  );
};

export default FAQsSection;
