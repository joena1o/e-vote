// Import necessary dependencies from Chakra UI and React
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Wrap,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';

// Import the motion and useAnimation from framer-motion
import { motion, useAnimation } from 'framer-motion';

// Define the generateMockData function
const generateMockData = () => {
  // Mock data for past election results
  const mockData = [
    {
      id: 1,
      electionName: '2023 SUG General Election',
      date: '2023-01-10',
      electionType: 'Presidential',
      candidates: [
        { name: 'Akinwumi Adesina', votes: 500, position: 'President' },
        { name: 'Aliya Hamza', votes: 650, position: 'President' },
        { name: 'Chukwuma Uche', votes: 350, position: 'President' },
      ],
      winner: 'Aliya Hamza',
      totalVoters: 1200,
      totalAccreditedVoters: 1000,
      totalVotesCast: 900,
      result: 'Winner: Aliya Hamza (Presidential)',
    },
    // Add more mock data as needed
  ];

  return mockData;
};

// Define the MotionCard component with motion(Card)
const MotionCard = motion(Card);

// Define the ViewResults component
const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults] = useState(generateMockData()); // Use the generateMockData function

  

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Wrap spacing={4}>
        {pastElectionResults.map((election) => (
          <WrapItem key={election.id} flex="1" minW="200px" maxW="300px">
            <motion.div
              initial={{ opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.5 }}
            >
              <MotionCard>
              <CardHeader>
                <Heading fontSize="sm" fontWeight="semibold">
                  {election.electionName}
                </Heading>
              </CardHeader>
              <CardBody>
  <Text fontSize="xs">Date: {election.date}</Text>
  <Text fontSize="xs">Election Type: {election.electionType}</Text>
  <Text fontSize="xs">Total Voters: {election.totalVoters}</Text>
  <Text fontSize="xs">Accredited Voters: {election.totalAccreditedVoters}</Text>
  <Text fontSize="xs">Votes Cast: {election.totalVotesCast}</Text>
  <Text fontSize="xs">Result: {election.result}</Text>
  <Text fontSize="xs">
    Winner: <Badge colorScheme="green">{election.winner}</Badge>
  </Text>
  <Table size="sm" variant="simple">
    <Thead>
      <Tr>
        <Th>Candidate</Th>
        <Th isNumeric>Votes</Th>
        <Th>Position</Th>
      </Tr>
    </Thead>
    <Tbody>
      {election.candidates.map((candidate) => (
        <Tr key={candidate.name}>
          <Td fontSize="xs">{candidate.name}</Td>
          <Td isNumeric fontSize="xs">
            {candidate.votes}
          </Td>
          <Td fontSize="xs">{candidate.position}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</CardBody>

            </MotionCard>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
