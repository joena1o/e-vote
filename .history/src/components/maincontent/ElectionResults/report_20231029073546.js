import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from '@chakra-ui/react';

const ElectionVotesLog = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  // Mock data for election votes log
  const mockVotesLog = [
    {
      id: 1,
      timestamp: '2023-04-05 10:15 AM',
      electionName: 'Election 1',
      position: 'President',
      selectedCandidate: 'Candidate A',
    },
    {
      id: 2,
      timestamp: '2023-04-06 09:30 AM',
      electionName: 'Election 2',
      position: 'Vice President',
      selectedCandidate: 'Candidate B',
    },
    {
      id: 3,
      timestamp: '2023-04-07 02:45 PM',
      electionName: 'Election 3',
      position: 'Secretary',
      selectedCandidate: 'Candidate C',
    },
  ];

  const [votesLog, setVotesLog] = useState(mockVotesLog);

  useEffect(() => {
    // You can fetch data from an API here if needed
    // For now, we're using the mock data
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Election Votes Log
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Timestamp</Th>
            <Th>Election Name</Th>
            <Th>Position</Th>
            <Th>Selected Candidate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {votesLog.map((vote) => (
            <Tr key={vote.id}>
              <Td>{vote.timestamp}</Td>
              <Td>{vote.electionName}</Td>
              <Td>{vote.position}</Td>
              <Td>{vote.selectedCandidate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ElectionVotesLog;
