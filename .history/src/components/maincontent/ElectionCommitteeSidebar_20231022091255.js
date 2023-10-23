import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiPieChart, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { useColorMode } from '@chakra-ui/react';

const SidebarContainer = styled.nav`
  background: ${props => (props.theme === 'dark' ? '#333' : 'linear-gradient(to right, #ce7348, #9a552e)')};
  padding: 15px;
  height: 100vh;
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  display: flex;
  flex-direction: column;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.3s ease;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 0.5rem;

  &:hover {
    color: #fce364;
  }

  width: 80px;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #fff;

  margin-bottom: 5px;

  ${StyledLink}:hover & {
    color: #fce364;
  }
`;

const QuickStats = styled.div`
  margin-top: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid #fff;
`;

function ElectionCommitteeSidebar() {
  const { colorMode } = useColorMode();

  return (
    <SidebarContainer theme={colorMode}>
      <LinkList>
        <LinkItem>
          <StyledLink to="ElectionCommittee-dashboard/dashboard">
            <Icon><FiHome /></Icon>
            Home
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="ElectionCommittee-dashboard/election-list">
            <Icon><FiFileText /></Icon>
            Elections
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="ElectionCommittee-dashboard/candidates-screening">
            <Icon><FiUsers /></Icon>
            Candidates
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="ElectionCommittee-dashboard/view-results">
            <Icon><FiPieChart /></Icon>
            Results
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/reports">
            <Icon><FiBarChart2 /></Icon>
            Reports
          </StyledLink>
        </LinkItem>
      </LinkList>
      <QuickStats>
        <h3>Quick Stats</h3>
        {/* Here you can place any quick statistics or relevant data for the admin */}
      </QuickStats>
    </SidebarContainer>
  );
}

export default ElectionCommitteeSidebar;
