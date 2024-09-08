import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (loggedInStatus && storedUserData) {
      setIsLoggedIn(true);
      setUser(storedUserData);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#2196f3',
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
