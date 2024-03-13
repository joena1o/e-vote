import styled from 'styled-components';
import Navbar from './Navbar';
import React from 'react';
import StudentDashSideBar from './StudentDashboardComponents/StudentDashboardSideBar';
import { Route, Routes } from 'react-router-dom';
import Nominate from './StudentDashboardComponents/Pages/Nominate';
import StudentVote from './StudentDashboardComponents/Pages/Vote';
import NominationPage from './StudentDashboardComponents/Pages/NominationPage';
import NomineesPage from './StudentDashboardComponents/Pages/NomineesPage';
import VotePage from './StudentDashboardComponents/Pages/VotePage';
import ElectionApplication from './StudentDashboardComponents/Pages/ElectionApplicationPage';
import { ActiveElection } from './StudentDashboardComponents/Pages/ActiveElection';
import StudentsProfile from './StudentDashboardComponents/Pages/StudentsProfile';

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
            <Route path="nominate" element={<Nominate />} />
            <Route path="election" element={<ActiveElection />} />
            <Route path='vote' element={<StudentVote />} />
            <Route path='nomination-page/:electionId' element={<NominationPage />} />
            <Route path='profile' element={<StudentsProfile />} />
            <Route path='nominees-page/:data' element={<NomineesPage />} />
            <Route path='vote-page/:data' element={<VotePage />} />
            <Route path='election-application-page/:data/:electionId/:positionId' element={<ElectionApplication />} />
            </Routes>
        </Content>
    </Container>;
}

export default StudentDashboard;