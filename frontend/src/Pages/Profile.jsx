import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAlt, FaBusinessTime, FaUsers, FaQuestionCircle, FaSignOutAlt, FaArrowRight, FaPencilAlt } from 'react-icons/fa';
import { MdHelpOutline } from 'react-icons/md';

// Import the individual components
import ProfileSection from '../components/profile/ProfileSection';
import MyBusinessSection from '../components/profile/MyBusinessSection';
import UsersRolesSection from '../components/profile/UsersRolesSection';
import HelpSection from '../components/profile/HelpSection';
import FAQsSection from '../components/profile/FAQsSection';

import SubMenu from '../components/SubMenu';

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 60px;
  background-color: #f9f9f9;
`;
const LeftBox = styled.div`
  flex: 0 0 20%;
  background-color: #311b92;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  border-radius: 20px;
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`;
const RightBox = styled.div`
  flex: 0 0 75%;
  padding: 0 20px;
  @media (max-width: 768px) {
    flex: 0 0 100%;
    padding: 0;
  }
`;

// Icons for navigation
const icons = {
  profile: <FaUserAlt />,
  business: <FaBusinessTime />,
  usersRoles: <FaUsers />,
  help: <MdHelpOutline />,
  faqs: <FaQuestionCircle />,
  logout: <FaSignOutAlt />
};

const Profile = () => {
 

  return (
   
      <ProfileContainer>
        {/* Left Box */}
        <LeftBox>
       <SubMenu/>
       </LeftBox>
        {/* Right Box */}
        <RightBox>
          
          <Routes>
            <Route path="my-profile" element={<ProfileSection />} />
            <Route path="my-business" element={<MyBusinessSection />} />
            <Route path="users-roles" element={<UsersRolesSection />} />
            <Route path="help" element={<HelpSection />} />
            <Route path="faqs" element={<FAQsSection />} />
           
          </Routes>
     
        </RightBox>
      </ProfileContainer>
    
  );
};

export default Profile;
