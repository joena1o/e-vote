import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import {
  Box,
  VStack,
  Heading,
  Text,
  ChakraProvider,
  useColorModeValue,
} from '@chakra-ui/react';
 // Import useColorModeValue from Chakra UI
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Past Election Results
        </Heading>
        {pastElectionResults.map((result, index) => (
          <VStack
            key={result.id}
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
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
    </ChakraProvider>
  );
};

export default ViewResults;