import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, CircularProgress, useColorModeValue, Alert, AlertIcon } from '@chakra-ui/react';
import { fetchTotalVoters, fetchUpcomingElections } from '../../../api/index'; // Adjust the import path as necessary

function ElectionCommitteeHome() {
  const [adminName] = useState('Admin'); // Assuming adminName is static for this example
  const [totalVoters, setTotalVoters] = useState(null);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votersData = await fetchTotalVoters();
        setTotalVoters(votersData);
        const electionsData = await fetchUpcomingElections();
        setUpcomingElections(electionsData);
      } catch (e) {
        setError('Failed to fetch data');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request: {error}
      </Alert>
    );
  }

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base" flex="1" textAlign="center" w="full">
      <VStack spacing={4} justify="center" align="center">
        <Heading fontSize="2xl" color={textColor}>Welcome, {adminName}</Heading>
        <Text fontSize="xl" color={textColor}>
          Total Voters: {totalVoters !== null ? totalVoters : 'Loading...'}
        </Text>
        <Text fontSize="xl" color={textColor}>
          Upcoming Elections: {upcomingElections.length}
        </Text>
        {/* You can add more statistics here */}
      </VStack>
    </Box>
  );
}

export default ElectionCommitteeHome;
