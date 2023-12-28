import styled from 'styled-components';
import Navbar from './Navbar';
import React from 'react';
import StudentDashSideBar from './StudentDashboardComponents/StudentDashboardSideBar';
import { Route, Routes } from 'react-router-dom';
import Settings from './maincontent/Settings/Settings';
import StudentNominate from './StudentDashboardComponents/Pages/Nominate';
import StudentVote from './StudentDashboardComponents/Pages/Vote';
import ElectionPage from './StudentDashboardComponents/Pages/ElectionPage';
import StudentHome from './StudentDashboardComponents/Pages/Home';
import NomineesPage from './StudentDashboardComponents/Pages/NomineesPage';
import VotePage from './StudentDashboardComponents/Pages/VotePage';
import ElectionApplication from './StudentDashboardComponents/Pages/ElectionApplicationPage';
import { ActiveElection } from './StudentDashboardComponents/Pages/ActiveElection';

 const StudentDashboard = ()=>{

    const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* Add the following line to ensure Container fills the screen height */
  height: 100vh;
  width: 100%; /* Use 100% to fill the entire width of the screen */
`;


const Content = styled.div`
  display: flex;
  /* Add the following line to ensure Content fills the remaining screen space */
  flex: 1;
`;

    return <Container>
        <Navbar />
        <Content>
            <StudentDashSideBar />
            <Routes>
            <Route index path="home" element={<StudentHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="nominate" element={<StudentNominate />} />
            <Route path="election" element={<ActiveElection />} />
            <Route path='vote' element={<StudentVote />} />
            <Route path='election-page' element={<ElectionPage />} />
            <Route path='nominees-page/:data' element={<NomineesPage />} />
            <Route path='vote-page/:data' element={<VotePage />} />
            <Route path='election-application-page/:data' element={<ElectionApplication />} />
            </Routes>
        </Content>
    </Container>;
}

export default StudentDashboard;