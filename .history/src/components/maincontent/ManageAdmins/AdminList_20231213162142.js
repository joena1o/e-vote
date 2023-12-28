import React from 'react';
import { ChakraProvider, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
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
      <VStack spacing={4} align="stretch">
        <form onSubmit={handleSubmit}>
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
        </form>
      </VStack>
    </ChakraProvider>
  );
};

export default ElectionForm;
