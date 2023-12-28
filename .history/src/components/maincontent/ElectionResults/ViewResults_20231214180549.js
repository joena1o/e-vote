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
  useColorModeValue,
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
    // Add more election data as needed
    {
      id: 2,
      electionName: '2023 Senate Election',
      date: '2023-02-15',
      electionType: 'Senate',
      totalVoters: 2000,
      totalAccreditedVoters: 1800,
      totalVotesCast: 1600,
      result: 'Final Result',
      candidates: [
        { name: 'John Doe', votes: 800, position: 'Senator' },
        { name: 'Jane Smith', votes: 750, position: 'Senator' },
        { name: 'Bob Johnson', votes: 450, position: 'Senator' },
      ],
      winner: 'John Doe',
    },
  ];
};

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterElectionType, setFilterElectionType] = useState('');
  const bgColor = useColorModeValue('gray.200', 'gray.600');

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
  }, [pastElectionResults, sortOrder, filterElectionType]);

  const handleCardClick = (electionId) => {
    console.log(`Card clicked for election with ID ${electionId}`);
    // Handle the click event, e.g., navigate to a detailed view
  };

  const electionTypeOptions = [
    { value: 'Presidential', label: 'Presidential' },
    { value: 'Senate', label: 'Senate' },
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
                animate={{ opacity: 1 }}
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
                  <Text fontSize="sm" color={colorModeValue('gray.600', 'gray.300')} mb={2}>
                    Date: {election.date}
                  </Text>
                  {/* ... (existing code) */}
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
