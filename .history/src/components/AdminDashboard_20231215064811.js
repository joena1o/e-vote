// AdminDashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import Home from './maincontent/home/Home';
import StudentManagement from './maincontent/RegisterStudents/StudentManagement';
import ViewResults from './maincontent/ElectionResults/ViewElectionResults';
import Settings from './maincontent/Settings/Settings';
import ManageAdmin from './maincontent/ManageAdmins/ManageAdmins';
import ManageElections from './maincontent/ManageElections/ManageElections';
import ElectionVotesLog from './maincontent/ElectionResults/report';

// Define styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto; /* Allow content to scroll */
  padding-bottom: 60px; /* Adjust for BottomNav height */
`;

const SidebarContainer = styled.div`
  /* Set the width of the sidebar for desktop view */
  @media (max-width: 768px) {
    width: 100%; /* Full width in mobile view */
  }
`;

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
`;

const AdminDashboard = () => {
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <Container>
      <Navbar />
      <Content>
        {isSmallScreen && <BottomNavContainer><BottomNav /></BottomNavContainer>}
        {!isSmallScreen && <SidebarContainer><Sidebar /></SidebarContainer>}
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="view-results" element={<ViewResults />} />
          <Route path="settings" element={<Settings />} />
          <Route path="manage-admin" element={<ManageAdmin />} />
          <Route path="manage-elections" element={<ManageElections />} />
          <Route path="election-Results" element={<ElectionVotesLog />} />
        </Routes>
      </Content>
      {!isSmallScreen && <Footer />}
    </Container>
  );
};

export default AdminDashboard;
