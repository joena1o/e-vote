import React from 'react';
import { Box, VStack, Heading, Text, CircularProgress, useColorModeValue, Alert, AlertIcon } from '@chakra-ui/react';
import { useElectionsData } from '../../../hooks/useElectionsData';

function ElectionCommitteeHome() {
  const { data, isLoading, error } = useElectionsData();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  return (
    <Box bg={bgColor} p={5} borderRadius="md" boxShadow="base" flex="1" textAlign="center" w="full">
      <VStack spacing={4} justify="center" align="center">
        <Heading fontSize="2xl" color={textColor}>Election Committee Dashboard</Heading>
        <VStack spacing={2}>
          <Text fontSize="xl" color={textColor}>Total Elections: {data?.length || 0}</Text>
          {/* You can add more statistics here */}
        </VStack>
      </VStack>
    </Box>
  );
}

export default ElectionCommitteeHome;
