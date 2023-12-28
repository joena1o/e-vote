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
      electionName: '2023 SUG General Election',
      date: '2023-01-10',
      electionType: 'Presidential',
      totalVoters: 1500,
      totalAccreditedVoters: 1200,
      totalVotesCast: 1100,
      result: 'Final Result',
      candidates: [
        { name: 'Akinwumi Adesina', votes: 500, position: 'President' },
        { name: 'Aliya Hamza', votes: 650, position: 'President' },
        { name: 'Chukwuma Uche', votes: 350, position: 'President' },
      ],
      winner: 'Aliya Hamza',
    },
    {
      id: 2,
      electionName: '2023 SUG Vice President Election',
      date: '2023-02-15',
      electionType: 'Vice Presidential',
      totalVoters: 1200,
      totalAccreditedVoters: 1000,
      totalVotesCast: 900,
      result: 'Final Result',
      candidates: [
        { name: 'Fatima Ahmed', votes: 400, position: 'Vice President' },
        { name: 'Brian Johnson', votes: 450, position: 'Vice President' },
        { name: 'Sophie Lee', votes: 50, position: 'Vice President' },
      ],
      winner: 'Brian Johnson',
    },
    {
      id: 3,
      electionName: '2023 SUG Treasurer Election',
      date: '2023-03-20',
      electionType: 'Treasurer',
      totalVoters: 1000,
      totalAccreditedVoters: 800,
      totalVotesCast: 750,
      result: 'Final Result',
      candidates: [
        { name: 'John Doe', votes: 300, position: 'Treasurer' },
        { name: 'Emma Watson', votes: 200, position: 'Treasurer' },
        { name: 'Michael Brown', votes: 250, position: 'Treasurer' },
      ],
      winner: 'John Doe',
    },
    
  ];
};


const ViewResults = () => {
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortedAndFilteredResults, setSortedAndFilteredResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterElectionType, setFilterElectionType] = useState('');
  const bgColor = 'gray.200';

  const controls = useAnimation();

  useEffect(() => {
    const sortedResults = pastElectionResults.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const filteredResults = filterElectionType
      ? sortedResults.filter((election) => election.electionType === filterElectionType)
      : sortedResults;

    setSortedAndFilteredResults(filteredResults);

    controls.start({ opacity: 1 });
  }, [controls, pastElectionResults, sortOrder, filterElectionType]);

  const handleCardClick = (electionId) => {
    console.log(`Card clicked for election with ID ${electionId}`);
    // Handle the click event, e.g., navigate to a detailed view
  };

  const electionTypeOptions = [
    { value: 'Presidential', label: 'Presidential' },
    // Add more options based on your election types
  ];

  return (
    <Box p={4} bg={bgColor}>
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
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
        <Button size="xs" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {`Sort ${sortOrder === 'asc' ? '▲' : '▼'}`}
        </Button>
      </Flex>
      <Wrap spacing={4}>
        {sortedAndFilteredResults.map((election) => (
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
                  {/* Add more Text components for other details */}
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
