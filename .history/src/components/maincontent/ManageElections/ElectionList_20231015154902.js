/*import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ElectionListContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const ElectionItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [view, setView] = useState('ongoing'); // 'ongoing' or 'past'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for testing
    const mockElections = [
      { id: '1', name: 'Election 1', type: 'General', startDate: '2023-01-01', endDate: '2023-01-10' },
      { id: '2', name: 'Election 2', type: 'Departmental', startDate: '2023-02-01', endDate: '2023-02-10' },
      // Add more mock elections as needed
    ];

    setElections(mockElections);
  }, []);

  const isOngoing = (election) => {
    const currentDate = new Date();
    const startDate = new Date(election.startDate);
    const endDate = new Date(election.endDate);
    return startDate <= currentDate && currentDate <= endDate;
  };

  const isPast = (election) => {
    const currentDate = new Date();
    const endDate = new Date(election.endDate);
    return currentDate > endDate;
  };

  return (
    <ElectionListContainer>
      <h1>Elections</h1>
      <Button onClick={() => setView('ongoing')}>View Ongoing Elections</Button>
      <Button onClick={() => setView('past')}>View Past Elections</Button>

      {loading && <p>Loading elections...</p>}
      {error && <p>Error fetching elections. Please try again.</p>}

      {view === 'ongoing' && !loading && !error && (
        <div>
          <h2>Ongoing Elections</h2>
          {elections.filter(isOngoing).map((election) => (
            <ElectionItem key={election.id}>
              <h3>{election.name}</h3>
              <p>Type: {election.type}</p>
              <p>Date: {election.startDate} - {election.endDate}</p>
              
            </ElectionItem>
          ))}
        </div>
      )}

      {view === 'past' && !loading && !error && (
        <div>
          <h2>Past Elections</h2>
          {elections.filter(isPast).map((election) => (
            <ElectionItem key={election.id}>
              <h3>{election.name}</h3>
              <p>Type: {election.type}</p>
              <p>Date: {election.startDate} - {election.endDate}</p>
             
            </ElectionItem>
          ))}
        </div>
      )}
    </ElectionListContainer>
  );
};
*/

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ElectionListContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #fce364;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #fce364;
  }
`;

const ElectionItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ElectionHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ElectionDetail = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [view, setView] = useState('ongoing'); // 'ongoing' or 'past'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for testing
    const mockElections = [
      { id: '1', name: 'Election 1', type: 'General', startDate: '2023-01-01', endDate: '2023-01-10' },
      { id: '2', name: 'Election 2', type: 'Departmental', startDate: '2023-02-01', endDate: '2023-02-10' },
      // Add more mock elections as needed
    ];

    setElections(mockElections);
  }, []);

  const isOngoing = (election) => {
    const currentDate = new Date();
    const startDate = new Date(election.startDate);
    const endDate = new Date(election.endDate);
    return startDate <= currentDate && currentDate <= endDate;
  };

  const isPast = (election) => {
    const currentDate = new Date();
    const endDate = new Date(election.endDate);
    return currentDate > endDate;
  };

  return (
    <ElectionListContainer>
      <h1>Elections</h1>
      <Button onClick={() => setView('ongoing')}>View Ongoing Elections</Button>
      <Button onClick={() => setView('past')}>View Past Elections</Button>

      {loading && <p>Loading elections...</p>}
      {error && <p>Error fetching elections. Please try again.</p>}

      {view === 'ongoing' && !loading && !error && (
        <div>
          <h2>Ongoing Elections</h2>
          {elections.filter(isOngoing).map((election) => (
            <ElectionItem key={election.id}>
              <ElectionHeader>{election.name}</ElectionHeader>
              <ElectionDetail>Type: {election.type}</ElectionDetail>
              <ElectionDetail>Date: {election.startDate} - {election.endDate}</ElectionDetail>
            </ElectionItem>
          ))}
        </div>
      )}

      {view === 'past' && !loading && !error && (
        <div>
          <h2>Past Elections</h2>
          {elections.filter(isPast).map((election) => (
            <ElectionItem key={election.id}>
              <ElectionHeader>{election.name}</ElectionHeader>
              <ElectionDetail>Type: {election.type}</ElectionDetail>
              <ElectionDetail>Date: {election.startDate} - {election.endDate}</ElectionDetail>
            </ElectionItem>
          ))}
        </div>
      )}
    </ElectionListContainer>
  );
};

export default ElectionList;

