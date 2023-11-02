import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  CircularProgress,
  Container,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { fetchTotalVoters, fetchUpcomingElections } from '../../../api/index';

function ElectionCommitteeHome() {
  const [adminName, setAdminName] = useState('Admin');
  const [totalVoters, setTotalVoters] = useState(null);
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getTotalVoters = async () => {
      try {
        const voters = await fetchTotalVoters();
        setTotalVoters(voters);
      } catch (error) {
        setError('Error fetching total voters');
        console.error('Error fetching total voters:', error);
      }
    };

    const getUpcomingElections = async () => {
      try {
        const elections = await fetchUpcomingElections();
        setUpcomingElections(elections);
      } catch (error) {
        setError('Error fetching upcoming elections');
        console.error('Error fetching upcoming elections:', error);
      }
    };

    getTotalVoters();
    getUpcomingElections();
  }, []);

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Container centerContent>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
        w="full"
        maxW="container.md"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Heading mb={6} color={textColor}>Welcome, {adminName}</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription display="block">{error}</AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
            </Alert>
          )}
          <Text fontSize="xl" color={textColor}>
            Total Voters: {totalVoters !== null ? totalVoters : <CircularProgress isIndeterminate color="green.300" />}
          </Text>
          <Text fontSize="xl" color={textColor}>
            Upcoming Elections: {upcomingElections.length}
          </Text>
          {/* You can add more statistics or components here */}
        </VStack>
      </Box>
    </Container>
  );
}

export default ElectionCommitteeHome;
