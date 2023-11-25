import React, { useState } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const mockPastElectionResults = [
    {
      id: 1,
      electionName: '2023 SUG General Election',
      date: '2023-01-10',
      electionType: 'Presidential',
      totalVoters: 1200,
      totalAccreditedVoters: 1000,
      totalVotesCast: 950,
      candidates: [
        { name: 'Akinwumi Adesina', votes: 500, position: 'President' },
        { name: 'Aliya Hamza', votes: 650, position: 'President' },
        { name: 'Chukwuma Uche', votes: 350, position: 'President' },
      ],
      winner: 'Aliya Hamza',
    },
    // ... other past election results
  ];

  const [pastElectionResults] = useState(mockPastElectionResults);

  return (
    <Box p={4}>
      <Heading size="lg" mb={6}>Past Election Results</Heading>
      {pastElectionResults.map((election) => (
        <VStack
          key={election.id}
          border="1px"
          borderColor={colorModeValue}
          borderRadius="lg"
          p={4}
          mb={4}
          spacing={2}
          align="left"
        >
          <Heading fontSize="xl" fontWeight="semibold">{election.electionName}</Heading>
          <Text>Date: {election.date}</Text>
          <Text>Election Type: {election.electionType}</Text>
          <Text>Winner: <Badge colorScheme="green">{election.winner}</Badge></Text>
          <Text>Total Voters: {election.totalVoters}</Text>
          <Text>Total Accredited Voters: {election.totalAccreditedVoters}</Text>
          <Text>Total Votes Cast: {election.totalVotesCast}</Text>
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
        </VStack>
      ))}
    </Box>
  );
};

export default ViewResults;
