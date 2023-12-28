import React, { useState } from 'react';
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
  align-items: center;
  font-size: 2rem; /* Decreased font size */
  height: 80px; /* Increased height */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  cursor: pointer;
  text-align: center;
  flex: 1; /* Equal flex distribution */
`;

const Icon = styled.div`
  color: ${props => (props.active ? '#fce364' : '#fff')};
  margin-bottom: 5px;
  font-size: 1.5rem; /* Decreased font size */
`;

const Title = styled.span`
  font-size: 0.8rem; /* Decreased font size */
  margin-top: 5px; /* Add space between icon and title */
  display: ${props => (props.active ? 'block' : 'none')};
`;

function BottomNav() {
  const { colorMode } = useColorMode();
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = iconName => {
    setActiveIcon(iconName === activeIcon ? null : iconName);
  };
  return (
    <BottomNavContainer theme={colorMode}>
      <StyledLink to="/admin-dashboard" onClick={() => handleIconClick('home')}>
        <Icon as={VscHome} active={activeIcon === 'home'} />
        <Title active={activeIcon === 'home'}>Home</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-admin" onClick={() => handleIconClick('manage-admin')}>
        <Icon as={VscAccount} active={activeIcon === 'manage-admin'} />
        <Title active={activeIcon === 'manage-admin'}>Manage Admins</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/student-management" onClick={() => handleIconClick('student-management')}>
        <Icon as={VscOrganization} active={activeIcon === 'student-management'} />
        <Title active={activeIcon === 'student-management'}>Student Management</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/manage-elections" onClick={() => handleIconClick('manage-elections')}>
        <Icon as={VscRemoteExplorer} active={activeIcon === 'manage-elections'} />
        <Title active={activeIcon === 'manage-elections'}>Manage Elections</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/view-results" onClick={() => handleIconClick('view-results')}>
        <Icon as={VscGraph} active={activeIcon === 'view-results'} />
        <Title active={activeIcon === 'view-results'}>View Results</Title>
      </StyledLink>
      <StyledLink to="/admin-dashboard/settings" onClick={() => handleIconClick('settings')}>
        <Icon as={VscSettingsGear} active={activeIcon === 'settings'} />
        <Title active={activeIcon === 'settings'}>Settings</Title>
      </StyledLink>
      <StyledLink to="/logout" onClick={() => handleIconClick('logout')}>
        <Icon as={VscSignOut} active={activeIcon === 'logout'} />
        <Title active={activeIcon === 'logout'}>Logout</Title>
      </StyledLink>
    </BottomNavContainer>
  );
}

export default BottomNav;
