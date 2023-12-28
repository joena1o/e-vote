import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { VscHome, VscAccount, VscRemoteExplorer, VscSettingsGear, VscSignOut, VscGraph, VscOrganization } from 'react-icons/vsc';
import { useColorMode } from '@chakra-ui/react';

const BottomNavContainer = styled.nav`
  background: ${props => (props.theme === 'dark' ? '#333' : 'linear-gradient(to right, #ce7348, #9a552e)')};
  padding: 20px;
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px -50px 100px -20px, rgba(0, 0, 0, 0.3) 0px -30px 60px -30px;
  display: flex;
  justify-content: space-around;
  flex-direction: column; /* Change to column layout */
  align-items: center; /* Center items */
  font-size: 1.5rem;
  height: 120px; /* Increased height */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 3.5rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }

  margin-bottom: 5px;
`;

const Title = styled.span`
  font-size: 1rem; /* Adjust font size for title */
  margin-top: 5px; /* Add space between icon and title */
`;

function BottomNav() {
  const { colorMode } = useColorMode();

  return (
    <BottomNavContainer theme={colorMode}>
      <StyledLink to="/admin-dashboard">
        <Icon><VscHome /></Icon>
        <Title>Home</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-admin">
        <Icon><VscAccount /></Icon>
        <Title>Manage Admins</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/student-management">
        <Icon><VscOrganization /></Icon>
        <Title>Student Management</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-elections">
        <Icon><VscRemoteExplorer /></Icon>
        <Title>Manage Elections</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/view-results">
        <Icon><VscGraph /></Icon>
        <Title>View Results</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/settings">
        <Icon><VscSettingsGear /></Icon>
        <Title>Settings</Title>
      </StyledLink>
      <StyledLink to="/logout">
        <Icon><VscSignOut /></Icon>
        <Title>Logout</Title>
      </StyledLink>
    </BottomNavContainer>
  );
}

export default BottomNav;
