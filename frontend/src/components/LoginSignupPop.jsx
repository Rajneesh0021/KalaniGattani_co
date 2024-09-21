import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import Swal from 'sweetalert2';

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
  const { login } = useContext(AuthContext);
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
    if (otp === '1234') {  
        const userData = {
        name: mobileNumber,
        phone: mobileNumber,
        email: `${mobileNumber}@KGC.com`,
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData)); 

      login(userData); 

      setShowPopup(false);
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome back, you have logged in successfully.',
        icon: 'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#4caf50',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text:'Wrong OTP !',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#f44336',
      });
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
