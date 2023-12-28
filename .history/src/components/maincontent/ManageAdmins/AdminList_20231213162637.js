import React from 'react';
import { ChakraProvider, VStack, FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import ReactSelect from 'react-select';

const electionOptions = [
  { value: 'general', label: 'General Election' },
  { value: 'senateDepartment', label: 'Senate Election (Department)' },
  { value: 'senateHall', label: 'Senate Election (Hall)' },
  { value: 'faculty', label: 'Faculty Election' },
  { value: 'departmental', label: 'Departmental Election' },
];

const ElectionForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <ChakraProvider>
      <Box borderWidth="1px" borderRadius="lg" p={4} maxW="400px" m="auto">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Election Type</FormLabel>
              <ReactSelect options={electionOptions} />
            </FormControl>

            <FormControl>
              <FormLabel>Head of Department (HOD) Email</FormLabel>
              <Input type="email" placeholder="Enter HOD Email" />
            </FormControl>

            <FormControl>
              <FormLabel>Hall Admin Email</FormLabel>
              <Input type="email" placeholder="Enter Hall Admin Email" />
            </FormControl>

            <Button type="submit" colorScheme="teal" mt={4}>
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ElectionForm;
