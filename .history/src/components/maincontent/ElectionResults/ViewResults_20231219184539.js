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
        { name: 'Chijioke Eze', votes: 800, position: 'President' },
        { name: 'Ngozi Okafor', votes: 650, position: 'President' },
        { name: 'Obinna Nwosu', votes: 350, position: 'President' },
      ],
      winner: 'Chijioke Eze',
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
        { name: 'Chioma Okeke', votes: 500, position: 'Secretary' },
        { name: 'Emeka Eze', votes: 600, position: 'Secretary' },
        { name: 'Nneka Okoro', votes: 300, position: 'Secretary' },
      ],
      winner: 'Emeka Eze',
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
        { name: 'Oluwaseun Adeleke', votes: 700, position: 'Treasurer' },
        { name: 'Chinyere Okonkwo', votes: 500, position: 'Treasurer' },
        { name: 'Adebayo Afolayan', votes: 400, position: 'Treasurer' },
      ],
      winner: 'Oluwaseun Adeleke',
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
        { name: 'Adesuwa Igbinoba', votes: 800, position: 'Vice President' },
        { name: 'Chukwudi Okonkwo', votes: 600, position: 'Vice President' },
        { name: 'Ngozi Eze', votes: 500, position: 'Vice President' },
      ],
      winner: 'Adesuwa Igbinoba',
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
        { name: 'Tunde Bakare', votes: 550, position: 'Senator' },
        { name: 'Amina Mohammed', votes: 600, position: 'Senator' },
        { name: 'Emmanuel Oladele', votes: 350, position: 'Senator' },
      ],
      winner: 'Amina Mohammed',
    },
    // Add more election data as needed
  ];
};
const ViewResults = () => {
  const [pastElectionResults, setPastElectionResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterDate, setFilterDate] = useState(null);
  const [isLargerThan768, isLargerThan1024] = useMediaQuery([
    '(min-width: 768px)',
    '(min-width: 1024px)',
  ]);

  useEffect(() => {
    const mockData = generateMockData();

    if (Array.isArray(mockData)) {
      let filteredResults = mockData;

      if (filterDate) {
        filteredResults = filteredResults.filter(
          (election) => new Date(election.date) >= filterDate
        );
      }

      const sortedResults = filteredResults.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      setPastElectionResults(sortedResults);
    }
  }, [sortOrder, filterDate]);

  const handleCardClick = (electionId) => {
    console.log(`Card clicked for election with ID ${electionId}`);
    // Handle the click event, e.g., navigate to a detailed view
  };

  const dateFilterOptions = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    // Add more options based on your date range
  ];

  const cardsToDisplay = isLargerThan768 ? (isLargerThan1024 ? 3 : 2) : 1;

  const itemsPerPage = cardsToDisplay;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentResults = pastElectionResults.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cardWidth = isLargerThan768
    ? `calc(${100 / cardsToDisplay}% - 16px)`
    : '100%';

  const cardHeight = isLargerThan768
    ? (isLargerThan1024 ? '450px' : '400px')
    : '450px';

  return (
    <Box p={4} bg="white">
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={4} direction={isLargerThan768 ? 'row' : 'column'}>
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
      <Flex mt={4} justify="center">
        {Array.from({ length: Math.ceil(pastElectionResults.length / itemsPerPage) }).map(
          (_, index) => (
            <Button
              key={index}
              size="xs"
              variant={index + 1 === currentPage ? 'solid' : 'outline'}
              onClick={() => paginate(index + 1)}
              m={1} // Added margin for better spacing
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