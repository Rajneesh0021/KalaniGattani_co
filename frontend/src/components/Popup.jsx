import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// Styled components for the Popup
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
  z-index: 999;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PopupTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #311b92;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #4a39b7;
  }
`;

// Popup component
const Popup = ({ title, isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const PAN = formData.get('PANCard');
    const DrivingLicense=formData.get('DrivingLicense');
   const AdharCard=formData.get('AdharCard');
    if (PAN && DrivingLicense && AdharCard ) {
      onSubmit({PAN,AdharCard,DrivingLicense});
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'Some error occured',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2196f3',
      });
    }
  };

  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>{title}</PopupTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </PopupHeader>
        <PopupBody>
          <form onSubmit={handleSubmit}>
            <label htmlFor="PANCard">PAN Card </label>
            <br/>
            <InputField type="file" name="PANCard" placeholder='PanCard' required />
            <br/>
            <label htmlFor="DrivingLicense">Driving License</label><br/>
            <InputField type="file" name="DrivingLicense" required /><br/>
            <label htmlFor="AdharCard">Aadhar card</label><br/>
            <InputField type="file" name="AdharCard" required />
           
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </PopupBody>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
