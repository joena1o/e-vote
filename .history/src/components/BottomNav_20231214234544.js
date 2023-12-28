import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { VscHome, VscAccount, VscRemoteExplorer, VscSettingsGear, VscSignOut, VscGraph, VscOrganization } from 'react-icons/vsc';
import { useColorMode } from '@chakra-ui/react';

const BottomNavContainer = styled.nav`
  background: ${props => (props.theme === 'dark' ? '#333' : 'linear-gradient(to right, #ce7348, #9a552e)')};
  padding: 15px;
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px -50px 100px -20px, rgba(0, 0, 0, 0.3) 0px -30px 60px -30px;
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #fce364;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const Icon = styled.div`
  font-size: 2.5rem; /* Increased icon size */
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Adjusted size for smaller screens */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Adjusted size for even smaller screens */
  }

  margin-bottom: 5px;

  ${StyledLink}:hover & {
    color: #fce364;
  }
`;

function BottomNav() {
  const { colorMode } = useColorMode();

  return (
    <BottomNavContainer theme={colorMode}>
      <StyledLink to="/admin-dashboard">
        <Icon><VscHome /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-admin">
        <Icon><VscAccount /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/student-management">
        <Icon><VscOrganization /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-elections">
        <Icon><VscRemoteExplorer /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/view-results">
        <Icon><VscGraph /></Icon>
      </StyledLink>
      <StyledLink to="/admin-dashboard/settings">
        <Icon><VscSettingsGear /></Icon>
      </StyledLink>
      <StyledLink to="/logout">
        <Icon><VscSignOut /></Icon>
      </StyledLink>
    </BottomNavContainer>
  );
}

export default BottomNav;
