// AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentManagement from './maincontent/RegisterStudents/StudentManagement'; 
import ViewResults from './maincontent/ElectionResults/ViewResults';
import Settings from './maincontent/Settings/Settings';
import Home from './maincontent/home/Home';
import ManageAdmin from './maincontent/ManageAdmins/ManageAdmins';
import ManageElections from './maincontent/ManageElections/ManageElections';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* Add the following line to ensure Container fills the screen height */
  height: 100vh; /* Use viewport height to fill the entire screen */
`;

const Content = styled.div`
  display: flex;
  /* Add the following line to ensure Content fills the remaining screen space */
  flex: 1;
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
        </Routes>
      </Content>
    </Container>
  );
};

export default AdminDashboard;
