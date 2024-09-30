import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Pages/HomePage';
import Services from './Pages/ServicesPage';
import Compliances from './Pages/CompliancesPage';
import Navbar from './components/Navbar';
import styled, { css } from 'styled-components';
import AboutPage from './Pages/AboutPage';
import Contact from './Pages/ContactPage';
import ExploreServices from './Pages/ExploreServicesPage';
import Profile from './Pages/ProfilePage';
import TicketStatusPage from './Pages/StatusPage';
import MessagePage from './Pages/MessagePage';
import PaymentPage from './Pages/PaymentPage';
import AdminDashboard from './Pages/Admin/admindashboard';
import ConsultantDashboard from './Pages/consultant/ConsultantDashboard';

// Conditionally styled component for content
const Content = styled.div`
  ${({ isAdminDashboard }) => css`
    margin-left: ${isAdminDashboard ? '0' : '10%'};
    padding: ${isAdminDashboard ? '0' : '20px'};
    @media (max-width: 768px) {
      margin-left: ${isAdminDashboard ? '0' : '0'};
      padding: ${isAdminDashboard ? '0' : '20px 10px'};
    }
  `}
`;

// Helper component to conditionally render based on route
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/consultant') ; // Check if the current path includes '/dashboard'

  return (
    <>
      {!isAdminDashboard && <Navbar />}
      {!isAdminDashboard && <Sidebar />}
      <Content isAdminDashboard={isAdminDashboard}>{children}</Content>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/compliances" element={<Compliances />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/exservices" element={<ExploreServices />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/ticket-status/:ticketId" element={<TicketStatusPage />} />
          <Route path='/message/:ticketId' element={<MessagePage />} />
          <Route path='/paynow/:ticketId' element={<PaymentPage />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/consultant' element={<ConsultantDashboard/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
