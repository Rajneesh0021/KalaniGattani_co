import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import FaqData from '../../data/data'; // Assuming the FAQ data is in this file

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
  height: 55vh;
  overflow-y: auto;
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
  height: 55vh;
  overflow-y: auto;
`;

const FAQsSection = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = Object.keys(FaqData);

  const handleBoxClick = (topicName) => {
    const details = Object.entries(FaqData[topicName]).map(([question, answer]) => ({
      question,
      answer,
      open: false,
    }));
    setSelectedTopic({ name: topicName, details });
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
                <Box key={topic} onClick={() => handleBoxClick(topic)}>
                  <BoxText>{topic}</BoxText>
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
                {detail.open && <p dangerouslySetInnerHTML={{ __html: detail.answer }}></p>}
              </DropdownBox>
            ))}
          </DetailedContent>
        </DetailedSection>
      )}
    </FAQsContainer>
  );
};

export default FAQsSection;
