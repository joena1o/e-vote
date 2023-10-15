import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiUsers, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';
import { useColorMode } from '@chakra-ui/react';

const SidebarContainer = styled.nav`
  background: ${props => (props.theme === 'dark' ? '#333' : 'white')};
  padding: 15px;
  height: 100vh;
  color: ${props => (props.theme === 'dark' ? '#fff' : '#333')};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  display: flex;
  flex-direction: column;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1; /* Make this container take up all available space */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.theme === 'dark' ? '#fff' : '#333')};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 0.5rem;

  /* Add media queries and other styles as needed */
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Icon = styled.div`
  font-size: 2rem;

  /* Add media queries and other styles as needed */
`;

function Sidebar() {
  const { colorMode } = useColorMode();

  return (
    <SidebarContainer theme={colorMode}>
      <LinkList>
        <LinkItem>
          <StyledLink to="/admin-dashboard" theme={colorMode}>
            <Icon><FiHome /></Icon>
            Home
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin-dashboard/manage-admin" theme={colorMode}>
            <Icon><FiUser /></Icon>
            Manage Admins
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin-dashboard/student-management" theme={colorMode}>
            <Icon><FiUsers /></Icon>
            Student Management
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin-dashboard/manage-elections" theme={colorMode}>
            <Icon><FiFileText /></Icon>
            Manage Elections
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin-dashboard/settings" theme={colorMode}>
            <Icon><FiSettings /></Icon>
            Settings
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/logout" theme={colorMode}>
            <Icon><FiLogOut /></Icon>
            Logout
          </StyledLink>
        </LinkItem>
      </LinkList>
    </SidebarContainer>
  );
}

export default Sidebar;
