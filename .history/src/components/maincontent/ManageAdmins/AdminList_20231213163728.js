import React, { useState } from 'react';
import { ChakraProvider, VStack, FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import ReactSelect from 'react-select';

const electionOptions = [
  { 
    value: 'general',
    label: 'General Election',
    hodEmail: 'general_hod@example.com',
    hallAdminEmail: 'general_hall_admin@example.com'
  },
  { 
    value: 'senateDepartment',
    label: 'Senate Election (Department)',
    hodEmail: 'department_hod@example.com',
    hallAdminEmail: 'department_hall_admin@example.com'
  },
  { 
    value: 'senateHall',
    label: 'Senate Election (Hall)',
    hodEmail: 'hall_hod@example.com',
    hallAdminEmail: 'hall_admin@example.com'
  },
  { 
    value: 'faculty',
    label: 'Faculty Election',
    hodEmail: 'faculty_hod@example.com',
    hallAdminEmail: 'faculty_hall_admin@example.com'
  },
  { 
    value: 'departmental',
    label: 'Departmental Election',
    hodEmail: 'departmental_hod@example.com',
    hallAdminEmail: 'departmental_hall_admin@example.com'
  },
];

const ElectionForm = () => {
  const [selectedElectionType, setSelectedElectionType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedOption = selectedElectionType;
    // Access the associated HOD and Hall Admin emails
    const hodEmail = selectedOption?.hodEmail || '';
    const hallAdminEmail = selectedOption?.hallAdminEmail || '';

    // Handle form submission logic here, including HOD and Hall Admin emails
    console.log('Selected Election Type:', selectedOption?.label);
    console.log('HOD Email:', hodEmail);
    console.log('Hall Admin Email:', hallAdminEmail);
  };

  return (
    <ChakraProvider>
      <Box borderWidth="1px" borderRadius="lg" p={4} maxW="400px" m="auto">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Election Type</FormLabel>
              <ReactSelect
                options={electionOptions}
                onChange={(selectedOption) => setSelectedElectionType(selectedOption)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Head of Department (HOD) Email</FormLabel>
              <Input type="email" placeholder="Enter HOD Email" />
            </FormControl>

            {selectedElectionType && (
              <FormControl>
                <FormLabel>Hall Admin Email</FormLabel>
                <Input type="email" placeholder="Enter Hall Admin Email" />
              </FormControl>
            )}

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
