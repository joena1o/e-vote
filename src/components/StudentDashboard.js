import styled from 'styled-components';
import Navbar from './Navbar';
import React, { useState } from 'react';
import StudentDashSideBar from './StudentDashboardComponents/StudentDashboardSideBar';
import { Route, Routes } from 'react-router-dom';
import Settings from './maincontent/Settings/Settings';
import StudentNominate from './StudentDashboardComponents/Pages/Nominate';
import StudentVote from './StudentDashboardComponents/Pages/Vote';
import StudentHome from './StudentDashboardComponents/Pages/Home';

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
            <Route index  element={<StudentHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="nominate" element={<StudentNominate />} />
            <Route path='vote' element={<StudentVote />} />
            </Routes>
        </Content>
    </Container>;
}

export default StudentDashboard;