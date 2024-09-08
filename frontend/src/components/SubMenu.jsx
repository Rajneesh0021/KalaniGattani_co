import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserAlt, FaBusinessTime, FaUsers, FaQuestionCircle, FaSignOutAlt, FaArrowRight, FaPencilAlt } from 'react-icons/fa';
import { MdHelpOutline } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';

const ProfileImageContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  object-fit: cover;
`;

const PencilIcon = styled(FaPencilAlt)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #007bff;
  padding: 5px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
`;

const UserName = styled.h2`
  font-size: 20px;
`;

const UserDetail = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LinksBox = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
`;

const LinkItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  text-decoration: none;
 border-bottom: 1px solid #ddd;
  &:hover {
    text-decoration:underline;
  }
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
`;

const LinkText = styled.p`
  margin-left: 10px;
  font-size: 16px;
`;

const SubMenu = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user && (
        <>
          <ProfileImageContainer>
            <ProfileImage src={`https://via.placeholder.com/120?text=${user.name.charAt(0)}`} alt="Profile" />
            <PencilIcon />
          </ProfileImageContainer>

          <UserName>{user.name}</UserName>
          <UserDetail>{user.phone}</UserDetail>
          <UserDetail>{user.email}</UserDetail>

          <LinksBox>
            <LinkItem to="/profile/my-profile">
              <LinkContent>
                <FaUserAlt />
                <LinkText>Profile</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>

            <LinkItem to="/profile/my-business">
              <LinkContent>
                <FaBusinessTime />
                <LinkText>My Business</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>

            <LinkItem to="/profile/users-roles">
              <LinkContent>
                <FaUsers />
                <LinkText>Users & Roles</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>

            <LinkItem to="/profile/help">
              <LinkContent>
                <MdHelpOutline />
                <LinkText>Help</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>

            <LinkItem to="/profile/faqs">
              <LinkContent>
                <FaQuestionCircle />
                <LinkText>FAQs</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>

            <LinkItem to="/">
              <LinkContent>
                <FaSignOutAlt />
                <LinkText onClick={logout}>Logout</LinkText>
              </LinkContent>
              <FaArrowRight />
            </LinkItem>
          </LinksBox>
        </>
      )}
    </>
  );
};

export default SubMenu;
