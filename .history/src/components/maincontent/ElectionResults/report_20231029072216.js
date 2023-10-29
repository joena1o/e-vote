import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';

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
      {votesLog.map((vote) => (
        <VStack
          key={vote.id}
          border="1px"
          borderColor={colorModeValue}
          borderRadius="lg"
          p={4}
          mb={4}
        >
          <Text>Timestamp: {vote.timestamp}</Text>
          <Text>Election Name: {vote.electionName}</Text>
          <Text>Position: {vote.position}</Text>
          <Text>Selected Candidate: {vote.selectedCandidate}</Text>
        </VStack>
      ))}
    </Box>
  );
};

export default ElectionVotesLog;
