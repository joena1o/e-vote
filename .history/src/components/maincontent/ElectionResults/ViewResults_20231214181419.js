import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import Select from 'react-select';

const MotionCard = motion(Box);

const generateMockData = () => {
  return [
    {
      id: 1,
      electionName: '2023 Student Union Presidential Election',
      date: '2023-05-15',
      electionType: 'Student Union',
      totalVoters: 2500,
      totalAccreditedVoters: 2000,
      totalVotesCast: 1800,
      result: 'Final Result',
      candidates: [
        { name: 'John Doe', votes: 800, position: 'President' },
        { name: 'Jane Smith', votes: 650, position: 'President' },
        { name: 'Mike Johnson', votes: 350, position: 'President' },
      ],
      winner: 'John Doe',
    },
    // Add more election data as needed
    {
      id: 2,
      electionName: '2022 Student Union Secretary Election',
      date: '2022-11-20',
      electionType: 'Student Union',
      totalVoters: 1800,
      totalAccreditedVoters: 1500,
      totalVotesCast: 1400,
      result: 'Final Result',
      candidates: [
        { name: 'Emily Davis', votes: 500, position: 'Secretary' },
        { name: 'Mark Anderson', votes: 600, position: 'Secretary' },
        { name: 'Sophia Johnson', votes: 300, position: 'Secretary' },
      ],
      winner: 'Mark Anderson',
    },
    // Add more election data as needed
    {
      id: 3,
      electionName: '2022 Student Union Treasurer Election',
      date: '2022-10-10',
      electionType: 'Student Union',
      totalVoters: 2000,
      totalAccreditedVoters: 1800,
      totalVotesCast: 1600,
      result: 'Final Result',
      candidates: [
        { name: 'David Brown', votes: 700, position: 'Treasurer' },
        { name: 'Emma White', votes: 500, position: 'Treasurer' },
        { name: 'Brian Taylor', votes: 400, position: 'Treasurer' },
      ],
      winner: 'David Brown',
    },
    // Add more election data as needed
    {
      id: 4,
      electionName: '2021 Student Union VP Election',
      date: '2021-12-01',
      electionType: 'Student Union',
      totalVoters: 2200,
      totalAccreditedVoters: 2000,
      totalVotesCast: 1900,
      result: 'Final Result',
      candidates: [
        { name: 'Olivia Moore', votes: 800, position: 'Vice President' },
        { name: 'Daniel Evans', votes: 600, position: 'Vice President' },
        { name: 'Sophie Hall', votes: 500, position: 'Vice President' },
      ],
      winner: 'Olivia Moore',
    },
    // Add more election data as needed
    {
      id: 5,
      electionName: '2021 Student Union Senate Election',
      date: '2021-09-15',
      electionType: 'Student Union',
      totalVoters: 1800,
      totalAccreditedVoters: 1600,
      totalVotesCast: 1500,
      result: 'Final Result',
      candidates: [
        { name: 'Alex Johnson', votes: 550, position: 'Senator' },
        { name: 'Mia Davis', votes: 600, position: 'Senator' },
        { name: 'Charlie Brown', votes: 350, position: 'Senator' },
      ],
      winner: 'Mia Davis',
    },
    // Add more election data as needed
  ];
};

const ViewResults = () => {
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterElectionType, setFilterElectionType] = useState('');

  const controls = useAnimation();

  useEffect(() => {
    // Sort the election results based on the date
    const sortedResults = pastElectionResults.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Apply election type filter
    const filteredResults = filterElectionType
      ? sortedResults.filter((election) => election.electionType === filterElectionType)
      : sortedResults;

    setPastElectionResults(filteredResults);

    controls.start({ opacity: 1 });
  }, [controls, pastElectionResults, sortOrder, filterElectionType]);

  const handleCardClick = (electionId) => {
    console.log(`Card clicked for election with ID ${electionId}`);
    // Handle the click event, e.g., navigate to a detailed view
  };

  const electionTypeOptions = [
    { value: 'Student Union', label: 'Student Union' },
    // Add more options based on your election types
  ];

  return (
    <Box p={4} bg="white">
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      {/* Filters and Sorting */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Select
            options={electionTypeOptions}
            isClearable
            placeholder="Filter by Election Type"
            onChange={(selectedOption) =>
              setFilterElectionType(selectedOption ? selectedOption.value : '')
            }
          />
        </Box>
        <Button
          size="xs"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {`Sort ${sortOrder === 'asc' ? '▲' : '▼'}`}
        </Button>
      </Flex>
      {/* Election Cards */}
      <Wrap spacing={4}>
        {pastElectionResults.map((election) => (
          <WrapItem key={election.id} flex="1" minW="200px" maxW="300px">
            <RouterLink to="/admin-dashboard/election-Results">
              <MotionCard
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(election.id)}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
              >
                <Box p={4}>
                  <Heading fontSize="lg" fontWeight="semibold" mb={2}>
                    {election.electionName}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Date: {election.date}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Election Type: {election.electionType}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Total Voters: {election.totalVoters}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Accredited Voters: {election.totalAccreditedVoters}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Votes Cast: {election.totalVotesCast}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Result: {election.result}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Winner:{' '}
                    <Badge colorScheme="green" fontSize="sm">
                      {election.winner}
                    </Badge>
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
                          <Td fontSize="sm">{candidate.name}</Td>
                          <Td isNumeric fontSize="sm">
                            {candidate.votes}
                          </Td>
                          <Td fontSize="sm">{candidate.position}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </MotionCard>
            </RouterLink>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
