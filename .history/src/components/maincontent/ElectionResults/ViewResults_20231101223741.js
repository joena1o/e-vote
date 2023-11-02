import React, { useState } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const mockPastElectionResults = [
    {
      id: 1,
      electionName: '2023 Presidential Election',
      date: '2023-01-10',
      electionType: 'Presidential',
      candidates: [
        { name: 'Akinwumi Adesina', votes: 500, position: 'President' },
        { name: 'Yemi Osinbajo', votes: 450, position: 'President' },
        { name: 'Peter Obi', votes: 350, position: 'President' },
      ],
      winner: 'Akinwumi Adesina',
    },
    {
      id: 2,
      electionName: '2023 Gubernatorial Election',
      date: '2023-02-15',
      electionType: 'Gubernatorial',
      candidates: [
        { name: 'Babatunde Fashola', votes: 600, position: 'Governor' },
        { name: 'Akin Ambode', votes: 550, position: 'Governor' },
        { name: 'Jide Sanwo-Olu', votes: 400, position: 'Governor' },
      ],
      winner: 'Babatunde Fashola',
    },
    {
      id: 3,
      electionName: '2023 Senatorial Election',
      date: '2023-03-20',
      electionType: 'Senatorial',
      candidates: [
        { name: 'Chimamanda Ngozi Adichie', votes: 750, position: 'Senator' },
        { name: 'Wole Soyinka', votes: 500, position: 'Senator' },
        { name: 'Chinua Achebe', votes: 250, position: 'Senator' },
      ],
      winner: 'Chimamanda Ngozi Adichie',
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
