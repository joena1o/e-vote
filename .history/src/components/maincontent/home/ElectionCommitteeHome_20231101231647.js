import React from 'react';
import { Box, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react';

function ElectionCommitteeHome() {
  // Mock data
  const adminName = 'Election Committee';
  const totalVoters = '1,234'; // Example total voters count
  const upcomingElectionsCount = 3; // Example upcoming elections count

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base" w="full">
      <Flex direction="column" justify="flex-start" align="flex-start">
        <Heading fontSize="2xl" color={textColor} mb={4}>
          Welcome, {adminName}
        </Heading>
        <Text fontSize="xl" color={textColor} mb={2}>
          Total Voters: {totalVoters}
        </Text>
        <Text fontSize="xl" color={textColor}>
          Upcoming Elections: {upcomingElectionsCount}
        </Text>
    
      </Flex>
    </Box>
  );
}

export default ElectionCommitteeHome;
