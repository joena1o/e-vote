// AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentManagement from './maincontent/RegisterStudents/StudentManagement';
import ViewResults from './maincontent/ElectionResults/ViewElectionResults';
import Settings from './maincontent/Settings/Settings';
import Home from './maincontent/home/Home';
import ManageAdmin from './maincontent/ManageAdmins/ManageAdmins';
import ManageElections from './maincontent/ManageElections/ManageElections';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import BottomNav from './BottomNav'; // Import the BottomNav component
import styled from 'styled-components';
import ElectionVotesLog from './maincontent/ElectionResults/report';

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
    flex-direction: column; // Stack components vertically on mobile view
  }
`;

const AdminDashboard = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <Sidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="view-results" element={<ViewResults />} />
          <Route path="settings" element={<Settings />} />
          <Route path="manage-admin" element={<ManageAdmin />} />
          <Route path="manage-elections" element={<ManageElections />} />
          <Route path="election-Results" element={<ElectionVotesLog />} />
        </Routes>
        <BottomNav /> {/* Add BottomNav component */}
      </Content>
      <Footer />
    </Container>
  );
};

export default AdminDashboard;
