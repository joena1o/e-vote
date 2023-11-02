import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for testing
    const mockPositions = {
      general: [
        { id: '1', name: 'President' },
        { id: '2', name: 'Vice President' },
      ],
      faculty: [
        { id: '3', name: 'Faculty President' },
        { id: '4', name: 'Faculty Secretary' },
      ],
      departmental: [
        { id: '5', name: 'Department Head' },
        { id: '6', name: 'Department Secretary' },
      ],
      hall: [
        { id: '7', name: 'Hall President' },
        { id: '8', name: 'Hall Secretary' },
      ],
    };

    setPositions(mockPositions);
  }, []);

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1" size="md" mb={6}>
        Available Positions
      </Heading>

      {loading && <Text>Loading positions...</Text>}
      {error && <Text color="red.500">Error fetching positions. Please try again.</Text>}

      <VStack spacing={6} align="start" w="100%">
        {Object.keys(positions).map((electionType) => (
          <Box key={electionType} p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <Heading as="h3" size="lg" mb={3}>
              {`${electionType.charAt(0).toUpperCase() + electionType.slice(1)} Positions`}
            </Heading>
            {positions[electionType].map((position) => (
              <Text key={position.id}>
                {position.name}
              </Text>
            ))}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default PositionList;
