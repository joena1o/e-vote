// components/maincontent/home/ElectionCommitteeHome.js
import React from 'react';
import styled from 'styled-components';
import { useElectionsData } from '../../hooks/useElectionsData'; // Custom Hook for fetching data

const HomeContainer = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Stat = styled.div`
  font-size: 1rem;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
`;

function ElectionCommitteeHome() {
  const { data, isLoading, error } = useElectionsData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  return (
    <HomeContainer>
      <Title>Election Committee Dashboard</Title>
      <Statistics>
        <Stat>Total Elections: {data?.length || 0}</Stat>
        {/* Add more stats as needed */}
      </Statistics>
    </HomeContainer>
  );
}

export default ElectionCommitteeHome;
