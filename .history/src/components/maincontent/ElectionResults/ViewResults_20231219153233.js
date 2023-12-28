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
  useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import Select from 'react-select';

const MotionCard = motion(Box);

const generateMockData = () => {
  // ... (previous generateMockData code)
};

const ViewResults = () => {
  const [pastElectionResults, setPastElectionResults] = useState(generateMockData());
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterElectionType, setFilterElectionType] = useState('');
  const [isLargerThan768, isLargerThan1024] = useMediaQuery([
    '(min-width: 768px)',
    '(min-width: 1024px)',
  ]);

  useEffect(() => {
    const sortedResults = pastElectionResults.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

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
    { value: 'Student Union', label: 'Student Union' },
    // Add more options based on your election types
  ];

  // Determine the number of cards to display based on screen size
  const cardsToDisplay = isLargerThan768 ? (isLargerThan1024 ? 3 : 2) : 1;

  // Pagination
  const itemsPerPage = cardsToDisplay;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentResults = pastElectionResults.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Adjust card width and height based on screen size
  const cardWidth = isLargerThan768
    ? `calc(${100 / cardsToDisplay}% - 16px)`
    : '100%';

  const cardHeight = isLargerThan768 ? '400px' : '500px'; // Adjust height as needed

  return (
    <Box p={4} bg="white">
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4} direction={isLargerThan768 ? 'row' : 'column'}>
        <Box mb={isLargerThan768 ? 0 : 4} mr={isLargerThan768 ? 4 : 0}>
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
          mb={isLargerThan768 ? 0 : 2}
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {`Sort ${sortOrder === 'asc' ? '▲' : '▼'}`}
        </Button>
      </Flex>
      <Wrap spacing={4} justify="center">
        {currentResults.map((election) => (
          <WrapItem key={election.id} w={cardWidth} mb={4}>
            <RouterLink to="/admin-dashboard/election-Results">
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                _hover={{ boxShadow: 'xl' }}
                onClick={() => handleCardClick(election.id)}
                h={cardHeight}
              >
                <Box p={4} display="flex" flexDirection="column" height="100%">
                  <Heading fontSize="lg" fontWeight="semibold" mb={2}>
                    {election.electionName}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Date: {election.date}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Type: {election.electionType}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Voters: {election.totalVoters}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Accredited: {election.totalAccreditedVoters}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Votes: {election.totalVotesCast}
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
              </Box>
            </RouterLink>
          </WrapItem>
        ))}
      </Wrap>
      {/* Pagination */}
      <Flex mt={4} justify="center">
        {Array.from({ length: Math.ceil(pastElectionResults.length / itemsPerPage) }).map(
          (_, index) => (
            <Button
              key={index}
              size="xs"
              variant={index + 1 === currentPage ? 'solid' : 'outline'}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          )
        )}
      </Flex>
    </Box>
  );
};

export default ViewResults;
