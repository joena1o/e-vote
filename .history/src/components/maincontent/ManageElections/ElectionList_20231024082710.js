import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, Container } from '@chakra-ui/react';

const ElectionList = () => {
  const [elections, setElections] = useState([]);
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

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1" size="xl" mb={6}>
        Available Elections
      </Heading>

      {loading && <Text>Loading elections...</Text>}
      {error && <Text color="red.500">Error fetching elections. Please try again.</Text>}

      <VStack spacing={6} align="start" w="100%">
        {elections.map((election) => (
          <Box key={election.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <Heading as="h3" size="lg" mb={3}>
              {election.name}
            </Heading>
            <Text>
              <strong>Type:</strong> {election.type}
            </Text>
            <Text>
              <strong>Date:</strong> {election.startDate} - {election.endDate}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default ElectionList;
