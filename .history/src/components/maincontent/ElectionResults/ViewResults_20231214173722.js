import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
  Button,
  Flex,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import Select from 'react-select';

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
    {
      id: 2,
      electionName: '2023 SUG Vice President Election',
      date: '2023-02-15',
      electionType: 'Vice Presidential',
      candidates: [
        { name: 'Oluwaseun Adebayo', votes: 300, position: 'Vice President' },
        { name: 'Chinwe Onyekachi', votes: 450, position: 'Vice President' },
        { name: 'Ngozi Okonkwo', votes: 200, position: 'Vice President' },
      ],
      winner: 'Chinwe Onyekachi',
    },
    {
      id: 3,
      electionName: '2023 SUG Secretary Election',
      date: '2023-03-20',
      electionType: 'Secretary',
      candidates: [
        { name: 'Jide Ogunleye', votes: 400, position: 'Secretary' },
        { name: 'Chiamaka Nwosu', votes: 550, position: 'Secretary' },
        { name: 'Tunde Oladele', votes: 300, position: 'Secretary' },
      ],
      winner: 'Chiamaka Nwosu',
    },
    // Add more election data as needed
  ];
};

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterElectionType, setFilterElectionType] = useState('');

  const controls = useAnimation();

  useEffect(() => {
    console.log('Filter:', filterElectionType, 'Sort Order:', sortOrder);

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
    { value: 'Vice Presidential', label: 'Vice Presidential' },
    { value: 'Secretary', label: 'Secretary' },
    // Add more options based on your election types
  ];

  return (
    <Box p={4}>
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
