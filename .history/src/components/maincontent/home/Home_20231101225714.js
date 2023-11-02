import React, { useEffect, useState } from 'react';
import { fetchTotalVoters, fetchUpcomingElections } from '../../../api/index';
import { HomeContainer, Title, Stats, StatItem } from './Home.styles';

const Home = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [totalVoters, setTotalVoters] = useState(null);
  const [upcomingElections, setUpcomingElections] = useState([]);

  useEffect(() => {
    const getTotalVoters = async () => {
      try {
        const voters = await fetchTotalVoters();
        setTotalVoters(voters);
      } catch (error) {
        console.error('Error fetching total voters:', error);
      }
    };

    const getUpcomingElections = async () => {
      try {
        const elections = await fetchUpcomingElections();
        setUpcomingElections(elections);
      } catch (error) {
        console.error('Error fetching upcoming elections:', error);
      }
    };

    getTotalVoters();
    getUpcomingElections();
  }, []);

  return (
    <HomeContainer>
      <Title>Welcome, {adminName}</Title>
      <Stats>
        <StatItem>Total Voters: {totalVoters ?? 'Loading...'}</StatItem>
        <StatItem>Upcoming Elections: {upcomingElections.length}</StatItem>
      </Stats>
      
    </HomeContainer>
  );
};

export default Home;
