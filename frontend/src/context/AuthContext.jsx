import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export const AuthContext = createContext();
// https://kalanigattani-co.onrender.com
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
    setUser(userData.user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('usertoken',(userData.token));
    localStorage.setItem('userData', JSON.stringify(userData.user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usertoken');
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
