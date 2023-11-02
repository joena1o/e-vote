// ElectionCommitteeDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectionCommitteeSidebar from './ElectionCommitteeSidebar';
import Navbar from './Navbar'; // Assuming you want to use the same Navbar
import styled from 'styled-components';
import ElectionList from './ManageElections/ElectionList';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const ElectionCommitteeDashboard = () => {
  return (
    <Container>
      <Navbar />
      <Content>
        <ElectionCommitteeSidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="election-list" element={<ElectionList />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="results" element={<Results />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default ElectionCommitteeDashboard;
