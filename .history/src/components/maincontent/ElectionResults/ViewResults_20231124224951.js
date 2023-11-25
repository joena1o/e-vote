import React, { useState } from 'react';
import {
  Box,
  VStack,
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  // Function to generate mock data
  const generateMockData = () => {
    const mockData = [];

    for (let i = 1; i <= 3; i++) {
      const election = {
        id: i,
        electionName: `2023 Election ${i}`,
        date: `2023-01-${i < 10 ? `0${i}` : i}`,
        electionType: 'Presidential',
        totalVoters: Math.floor(Math.random() * 1500) + 500,
        totalAccreditedVoters: Math.floor(Math.random() * 1200) + 300,
        totalVotesCast: Math.floor(Math.random() * 1000) + 200,
        candidates: [],
      };

      for (let j = 1; j <= 3; j++) {
        election.candidates.push({
          name: `Candidate ${j}`,
          votes: Math.floor(Math.random() * 500) + 100,
          position: 'President',
        });
      }

      const winnerIndex = Math.floor(Math.random() * 3);
      election.winner = election.candidates[winnerIndex].name;

      mockData.push(election);
    }

    return mockData;
  };

  const [pastElectionResults] = useState(generateMockData());

  return (
    <Box p={4}>
      <Heading size="lg" mb={6}>
        Past Election Results
      </Heading>
      {pastElectionResults.map((election) => (
        <Card key={election.id} mb={4}>
          <CardHeader>
            <Heading fontSize="xl" fontWeight="semibold">
              {election.electionName}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>Date: {election.date}</Text>
            <Text>Election Type: {election.electionType}</Text>
            <Text>Total Voters: {election.totalVoters}</Text>
            <Text>Total Accredited Voters: {election.totalAccreditedVoters}</Text>
            <Text>Total Votes Cast: {election.totalVotesCast}</Text>
            <Text>
              Winner: <Badge colorScheme="green">{election.winner}</Badge>
            </Text>
            <Table variant="simple">
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
                    <Td>{candidate.name}</Td>
                    <Td isNumeric>{candidate.votes}</Td>
                    <Td>{candidate.position}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default ViewResults;
