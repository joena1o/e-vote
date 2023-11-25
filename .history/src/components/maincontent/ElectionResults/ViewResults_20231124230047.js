import React, { useState } from 'react';
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

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

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
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Wrap spacing={4}>
        {pastElectionResults.map((election) => (
          <WrapItem key={election.id} flex="1" minW="200px" maxW="300px">
            <Card>
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
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
