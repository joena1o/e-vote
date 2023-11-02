import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiUsers, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';
import {BsPersonDown} from 'react-icons/bs';
import {MdOutlineHowToVote} from 'react-icons/md';
import {GrDocumentVerified} from "react-icons/gr";
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

  @media (max-width: 768px) {
    font-size: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.3rem;
  }
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  margin-bottom: 5px;

  ${StyledLink}:hover & {
    color: #fce364;  // Change icon color when the link is hovered
  }
`;

function StudentDashSideBar() {
  const { colorMode } = useColorMode();

  return (
    <SidebarContainer theme={colorMode}>
      <LinkList>
        <LinkItem>
          <StyledLink to="/student-dashboard" theme={colorMode}>
            <Icon><FiHome /></Icon>
            Home
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/student-dashboard/nominate" theme={colorMode}>
            <Icon><BsPersonDown /></Icon>
            Nominate
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="vote" theme={colorMode}>
            <Icon><MdOutlineHowToVote /></Icon>
            Vote
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/settings" theme={colorMode}>
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

export default StudentDashSideBar;
