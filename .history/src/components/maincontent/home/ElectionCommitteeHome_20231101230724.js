import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  CircularProgress,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { useElectionsData } from '../../../hooks/useElectionsData';

function ElectionCommitteeHome() {
  const { data, isLoading, error } = useElectionsData();
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  // If you need to fetch data similarly to the Home component, you would have useEffect here
  // useEffect(() => {
  //   // Your data fetching logic
  // }, []);

  if (isLoading) {
    return (
      <Container centerContent>
        <CircularProgress isIndeterminate color="green.300" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Box p={5} textAlign="center">
          <Text color="red.500">{error.message}</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
        w="full"
        maxW="container.md"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Heading mb={6} color={textColor}>Election Committee Dashboard</Heading>
          <Text fontSize="xl" color={textColor}>
            Total Elections: {data?.length || 0}
          </Text>
          {/* You can add more statistics or components here */}
        </VStack>
      </Box>
    </Container>
  );
}

export default ElectionCommitteeHome;
