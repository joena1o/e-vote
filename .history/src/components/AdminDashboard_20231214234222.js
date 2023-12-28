// AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
  height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AdminDashboard = () => {
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <Container>
      <Navbar />
      <Content>
        {isSmallScreen ? (
          <Routes>
            <Route index element={<Home />} />
            <Route path="student-management" element={<StudentManagement />} />
            <Route path="view-results" element={<ViewResults />} />
            <Route path="settings" element={<Settings />} />
            <Route path="manage-admin" element={<ManageAdmin />} />
            <Route path="manage-elections" element={<ManageElections />} />
            <Route path="election-Results" element={<ElectionVotesLog />} />
          </Routes>
        ) : (
          <Sidebar />
        )}
        {isSmallScreen ? <BottomNav /> : <Footer />}
      </Content>
      {!isSmallScreen && <Footer />}
    </Container>
  );
};

export default AdminDashboard;
