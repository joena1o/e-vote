import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
  Wrap,
  WrapItem,
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

const MotionCard = motion(Card);

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
            <Link to={`/election/${election.id}`}>
              {/* Wrap MotionCard with Link */}
              <MotionCard
                initial={{ opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.5 }}
              >
                <CardHeader>
                  <Heading fontSize="sm" fontWeight="semibold">
                    {election.electionName}
                  </Heading>
                </CardHeader>
                {/* ... rest of the card content */}
              </MotionCard>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ViewResults;
