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
  font-size: 2rem; /* Larger font size */
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
  font-size: 3.5rem; /* Adjusted font size for larger icons */
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }

  margin-bottom: 5px;
`;

function BottomNav() {
  const { colorMode } = useColorMode();

  return (
    <BottomNavContainer theme={colorMode}>
      <StyledLink to="/admin-dashboard" title="Home">
        <Icon><VscHome /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-admin" title="Manage Admins">
        <Icon><VscAccount /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/student-management" title="Student Management">
        <Icon><VscOrganization /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-elections" title="Manage Elections">
        <Icon><VscRemoteExplorer /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/view-results" title="View Results">
        <Icon><VscGraph /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/settings" title="Settings">
        <Icon><VscSettingsGear /></Icon>
      </StyledLink>
      <StyledLink to="/logout" title="Logout">
        <Icon><VscSignOut /></Icon>
      </StyledLink>
    </BottomNavContainer>
  );
}

export default BottomNav;
