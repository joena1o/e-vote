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
  margin-left: 100px; /* Adjust based on the width of SidebarContainer */

  @media (max-width: 768px) {
    flex-direction: column;
    padding-bottom: 60px; /* Adjust for BottomNav height */
    margin-left: 0; /* Reset margin for small screens */
  }
`;

const SidebarContainer = styled.div`
  @media (min-width: 769px) {
    position: fixed;
    top: 60px; /* Adjust based on the height of FixedNavbar */
    left: 0;
    bottom: 0;
    width: 100px; /* Adjust as needed */
   
    z-index: 1000; /* Ensure a higher z-index value */
  }
`;



const FooterContainer = styled.div`
  @media (min-width: 769px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000; /* Ensure a higher z-index value */
  }
`;

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000; /* Ensure a higher z-index value */
`;

const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const FixedNavbar = styled(Navbar)`
  width: 100%;
`;

const FixedFooter = styled(Footer)`
  width: 100%;
`;

const AdminDashboard = () => {
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <AdminDashboardContainer>
      {!isSmallScreen && <FixedNavbar><Navbar /></FixedNavbar>}
      <Content>
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
      {isSmallScreen && (
        <BottomNavContainer>
          <BottomNav />
        </BottomNavContainer>
      )}
      {!isSmallScreen && <FooterContainer><FixedFooter><Footer /></FixedFooter></FooterContainer>}
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
