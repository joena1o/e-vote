import React, { useState, useEffect } from 'react';
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
  Link as RouterLink,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

const MotionCard = motion(Box);

const ViewResults = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');
  const [pastElectionResults] = useState(generateMockData());

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Past Election Results
      </Heading>
      <Wrap spacing={4}>
        {pastElectionResults.map((election) => (
          <WrapItem key={election.id} flex="1" minW="200px" maxW="300px">
            <RouterLink to={`/election/${election.id}`}>
              <MotionCard
                as="button"
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  // Handle any additional click logic if needed
                }}
                p={4}
                border="1px"
                borderColor={colorModeValue}
                borderRadius="lg"
                cursor="pointer"
              >
                <Heading fontSize="sm" fontWeight="semibold">
                  {election.electionName}
                </Heading>
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
              </MotionCard>
            </RouterLink>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
