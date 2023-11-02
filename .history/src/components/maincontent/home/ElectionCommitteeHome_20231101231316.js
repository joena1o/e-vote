import React from 'react';
import { Box, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';

function ElectionCommitteeHome() {
  // Mock data
  const adminName = 'Admin';
  const totalVoters = '1,234'; // Example total voters count
  const upcomingElectionsCount = 3; // Example upcoming elections count

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base" flex="1" textAlign="center" w="full">
      <VStack spacing={4} justify="center" align="center">
        <Heading fontSize="2xl" color={textColor}>Welcome, {adminName}</Heading>
        <Text fontSize="xl" color={textColor}>
          Total Voters: {totalVoters}
        </Text>
        <Text fontSize="xl" color={textColor}>
          Upcoming Elections: {upcomingElectionsCount}
        </Text>
        {/* You can add more statistics here */}
      </VStack>
    </Box>
  );
}

export default ElectionCommitteeHome;
