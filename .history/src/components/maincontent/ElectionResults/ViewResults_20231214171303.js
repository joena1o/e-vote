import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Badge, Wrap, WrapItem, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import Select from 'react-select';
import { Link as RouterLink } from 'react-router-dom';

const MotionCard = motion(Card);

const generateMockData = () => {
  return [
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
    },
    // Add more election data as needed
  ];
};



const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [filterElectionType, setFilterElectionType] = useState(''); // Filter by election type

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
    { value: 'Presidential', label: 'Presidential' },
    // Add more options based on your election types
  ];

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      {/* Filters */}
      <Box mb={4}>
        <Select
          options={electionTypeOptions}
          isClearable
          placeholder="Filter by Election Type"
          onChange={(selectedOption) =>
            setFilterElectionType(selectedOption ? selectedOption.value : '')
          }
        />
        <Button ml={2} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
        </Button>
      </Box>
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
              >
                <CardHeader>
                  <Heading fontSize="sm" fontWeight="semibold">
                    {election.electionName}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="xs">Date: {election.date}</Text>
                  <Text fontSize="xs">Election Type: {election.electionType}</Text>
                  {/* Add more details as needed */}
                </CardBody>
              </MotionCard>
            </RouterLink>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
