import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const mockPastElectionResults = [
    {
      id: 1,
      electionName: '2023 Presidential Election',
      date: '2023-01-10',
      winner: 'Akinwumi Adesina',
      votes: 500,
      electionType: 'Presidential',
      position: 'President',
    },
    {
      id: 2,
      electionName: '2023 Gubernatorial Election',
      date: '2023-02-15',
      winner: 'Babatunde Fashola',
      votes: 600,
      electionType: 'Gubernatorial',
      position: 'Governor',
    },
    {
      id: 3,
      electionName: '2023 Senatorial Election',
      date: '2023-03-20',
      winner: 'Chimamanda Ngozi Adichie',
      votes: 750,
      electionType: 'Senatorial',
      position: 'Senator',
    },
    // ... other past election results
  ];

  const [pastElectionResults, setPastElectionResults] = useState(mockPastElectionResults);

  useEffect(() => {
    const fetchResults = async () => {
      // Fetch results from an API or other data source
      // If fetching from an API, you would use something like:
      // const results = await API.get('yourApiName', '/results');
      // setPastElectionResults(results);
    };

    fetchResults();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg" mb={6}>Past Election Results</Heading>
      {pastElectionResults.map((result) => (
        <VStack
          key={result.id}
          border="1px"
          borderColor={colorModeValue}
          borderRadius="lg"
          p={4}
          mb={4}
          spacing={2}
          align="left"
        >
          <Text fontSize="xl" fontWeight="semibold">{result.electionName}</Text>
          <Text>Date: {result.date}</Text>
          <Text>Winner: {result.winner}</Text>
          <Text>Votes: {result.votes}</Text>
          <Text>Election Type: {result.electionType}</Text>
          <Text>Position: {result.position}</Text>
        </VStack>
      ))}
    </Box>
  );
};

export default ViewResults;
