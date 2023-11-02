import React from 'react';
import { Box, VStack, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react';

function ElectionCommitteeHome() {
  // Mock data
  const adminName = 'Admin';
  const totalVoters = '1,234'; // Example total voters count
  const upcomingElectionsCount = 3; // Example upcoming elections count

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base" flex="1" w="full">
      <Flex direction="column" align="start" justify="center" h="full">
        <Heading fontSize="2xl" color={textColor} alignSelf="flex-start">
          Welcome, {adminName}
        </Heading>
        <VStack spacing={4} align="stretch" mt={4}>
          <Text fontSize="xl" color={textColor}>
            Total Voters: {totalVoters}
          </Text>
          <Text fontSize="xl" color={textColor}>
            Upcoming Elections: {upcomingElectionsCount}
          </Text>
          {/* You can add more statistics here */}
        </VStack>
      </Flex>
    </Box>
  );
}

export default ElectionCommitteeHome;
