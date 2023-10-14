import React, { useEffect, useState } from 'react';
import { API, Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Amplify.configure(awsconfig);

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const ViewResults = () => {
  const [pastElectionResults, setPastElectionResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiData = await API.get('yourApiName', '/path-to-your-endpoint');
        setPastElectionResults(apiData.results);
      } catch (error) {
        console.error('Error fetching results:', error);
        toast.error('Failed to fetch past election results. Please try again.');
      }
    };

    fetchResults();
  }, []);

  return (
    <Container>
      <h1>Past Election Results</h1>
      <Table>
        <thead>
          <tr>
            <Th>Election Name</Th>
            <Th>Date</Th>
            <Th>Winner</Th>
            <Th>Votes</Th>
          </tr>
        </thead>
        <tbody>
          {pastElectionResults.map((result) => (
            <tr key={result.id}>
              <Td>{result.electionName}</Td>
              <Td>{result.date}</Td>
              <Td>{result.winner}</Td>
              <Td>{result.votes}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewResults;
