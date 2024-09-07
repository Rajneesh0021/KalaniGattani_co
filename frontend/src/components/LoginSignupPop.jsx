import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

// Styled Components
const Overlay = styled.div`
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

const LoginForm = styled.form`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const OtpDialog = styled.div`
  margin-top: 20px;
`;

// Component
const LoginSignupPop = () => {
  const { login } = useContext(AuthContext); // Use AuthContext for login
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    setOtpSent(true); // OTP is sent logic
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === '1234') {  // Replace with actual OTP verification logic
      // Create user data based on phone number
      const userData = {
        name: mobileNumber,
        phone: mobileNumber,
        email: `${mobileNumber}@KGC.com`,
        profileImage: `https://via.placeholder.com/120?text=${mobileNumber.charAt(0)}` // First digit of phone number as profile image
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData)); // Store user data in localStorage

      login(userData); // Update AuthContext with the logged-in user data

      setShowPopup(false);
      alert('Logged in successfully!');
    } else {
      alert('Invalid OTP');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <Overlay>
          <LoginForm onSubmit={otpSent ? handleOtpSubmit : handleMobileSubmit}>
            <CloseButton onClick={closePopup}>×</CloseButton>
            {!otpSent ? (
              <>
                <h3>Enter Mobile Number</h3>
                <InputField
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Button type="submit">Send OTP</Button>
              </>
            ) : (
              <>
                <h3>Enter OTP</h3>
                <InputField
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <OtpDialog>
                  <Button type="submit">Confirm OTP</Button>
                </OtpDialog>
              </>
            )}
          </LoginForm>
        </Overlay>
      )}
    </>
  );
};

export default LoginSignupPop;
