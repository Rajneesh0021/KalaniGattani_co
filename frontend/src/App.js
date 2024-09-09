// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Pages/HomePage';
import Services from './Pages/ServicesPage';
import Compliances from './Pages/CompliancesPage';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import AboutPage from './Pages/AboutPage';
import Contact from './Pages/ContactPage';
import ExploreServices from './Pages/ExploreServicesPage';
import Profile from './Pages/ProfilePage';
import TicketStatusPage from './Pages/StatusPage';
import MessagePage from './Pages/MessagePage';
import PaymentPage from './Pages/PaymentPage';

const Content = styled.div`
  margin-left: 10%;
  padding: 20px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 60px;
      padding:20px 10px;
  }
`;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/compliances" element={<Compliances />} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/exservices" element={<ExploreServices/>}/>
          <Route path="/profile/*" element={<Profile/>}>
          
          </Route>
          <Route path="/ticket-status/:ticketId" element={<TicketStatusPage/>}/>
          <Route path='/message/:ticketId' element={<MessagePage/>}/>
          <Route path='/paynow/:ticketId' element={<PaymentPage/>}/>
        </Routes>
      </Content>
    </Router>
  );
};

export default App;
