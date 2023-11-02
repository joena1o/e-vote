import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Box, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const mockPastElectionResults = [
    {
      id: 1,
      electionName: 'Election 1',
      date: '2023-01-10',
      winner: 'Candidate A',
      votes: 500,
    },
    {
      id: 2,
      electionName: 'Election 2',
      date: '2023-02-15',
      winner: 'Candidate B',
      votes: 600,
    },
    {
      id: 3,
      electionName: 'Election 3',
      date: '2023-03-20',
      winner: 'Candidate C',
      votes: 750,
    },
  ];

  const [pastElectionResults, setPastElectionResults] = useState(mockPastElectionResults);

  useEffect(() => {
    const fetchResults = async () => {
    
    };

    fetchResults();
  }, []);

  return (
    <Box p={4}>

      {pastElectionResults.map((result) => (
        <VStack
          key={result.id}
          border="1px"
          borderColor={colorModeValue}
          borderRadius="lg"
          p={4}
          mb={4}
        >
          <Text fontSize="xl">Election Name: {result.electionName}</Text>
          <Text>Date: {result.date}</Text>
          <Text>Winner: {result.winner}</Text>
          <Text>Votes: {result.votes}</Text>
        </VStack>
      ))}
    </Box>
  );
};

export default ViewResults;