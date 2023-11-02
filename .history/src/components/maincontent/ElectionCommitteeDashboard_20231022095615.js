// ElectionCommitteeDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectionCommitteeSidebar from './ElectionCommitteeSidebar';
import Navbar from '../Navbar'; 
import styled from 'styled-components';
import ElectionList from './ManageElections/ElectionList';
import ViewResults from './ElectionResults/ViewResults';
import Home from './home/ElectionCommitteeHome';
import CandidatesScreening from './CandidateScreening/CandidateScreening';



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
          <Route path="ElectionCommitteeHome" element={<ElectionCommitteeHome />} />
          <Route path="election-list" element={<ElectionList />} />
          <Route path="candidates-screening" element={<CandidatesScreening />} />
          <Route path="view-results" element={<ViewResults />} />
          
        </Routes>
      </Content>
    </Container>
  );
};

export default ElectionCommitteeDashboard;
