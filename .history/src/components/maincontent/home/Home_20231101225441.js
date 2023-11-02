import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  Container,
  theme,
  extendTheme,
  useColorModeValue,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

// Extend the theme to include custom colors, fonts, etc
const customTheme = extendTheme({
  // Custom theme overrides go here
});

// Mock API functions
const fetchTotalVoters = async () => {
  // Replace with actual API call
  return Promise.resolve(1024);
};

const fetchUpcomingElections = async () => {
  // Replace with actual API call
  return Promise.resolve([
    { id: 1, name: 'Presidential Election', date: '2023-11-04' },
    { id: 2, name: 'Local Government Election', date: '2023-12-12' },
    // ... other upcoming elections
  ]);
};

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

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <ChakraProvider theme={customTheme}>
      <Container maxW="container.xl" p={5}>
        <VStack spacing={5} align="stretch">
          <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base">
            <Heading mb={4}>Welcome, {adminName}</Heading>
            <VStack spacing={4}>
              <Stat>
                <StatLabel>Total Voters</StatLabel>
                <StatNumber>{totalVoters ?? <CircularProgress isIndeterminate color="green.300" />}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Upcoming Elections</StatLabel>
                <StatNumber>{upcomingElections.length}</StatNumber>
              </Stat>
            </VStack>
          </Box>

          <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base">
            <Heading size="md" mb={4}>Upcoming Elections</Heading>
            {upcomingElections.length > 0 ? (
              <VStack spacing={3}>
                {upcomingElections.map((election) => (
                  <Box key={election.id} p={3} bg="white" borderRadius="md" boxShadow="sm">
                    <Text fontWeight="bold">{election.name}</Text>
                    <Text fontSize="sm">Date: {election.date}</Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>No upcoming elections.</Text>
            )}
          </Box>

          {/* Additional UI components can be added here */}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Home;
