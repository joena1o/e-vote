import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel, Box, Table, Thead, Tbody, Tr, Th, Td, VStack, Flex, Text, useColorMode } from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [elections, setElections] = useState([]);
  const { colorMode } = useColorMode();

  const formik = useFormik({
    initialValues: {
      electionTitle: '',
      electionType: '',
      nominationStartDate: '',
      nominationEndDate: '',
      startDate: '',
      positions: [],
      committeeMembers: [],
    },
    onSubmit: async (values) => {
      // Calculate end date by adding 24 hours to start date
      const endDate = new Date(values.startDate);
      endDate.setHours(endDate.getHours() + 24);
      values.endDate = endDate.toISOString(); // Set the end date in ISO format
      setModalIsOpen(true);
      setElections([...elections, values]);
    },
  });

  const electionTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' },
  ];

  const students = [
    { value: 'Pascal@example.com', label: 'Prisca Ahmadu' },
    { value: 'Prisca@example.com', label: 'Paul Ahmadu' },
  ];

  const positions = [
    { value: 'President', label: 'President' },
    { value: 'Vice President', label: 'Vice President' },
    // ... add other positions as needed
  ];

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)} mt={5}>
        Open Election Form
      </Button>

      <Box width="100%" mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Election Title</Th>
              <Th>Election Type</Th>
              <Th>Positions Added</Th>
              <Th>Nomination Start Date</Th>
              <Th>Nomination End Date</Th>
              <Th>Election Start Date</Th>
              <Th>Election End Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {elections.map((election, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{election.electionTitle}</Td>
                <Td>{election.electionType}</Td>
                <Td>{election.positions.join(', ')}</Td>
                <Td>{election.nominationStartDate}</Td>
                <Td>{election.nominationEndDate}</Td>
                <Td>{election.startDate}</Td>
                <Td>{election.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Election</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl width="100%">
                <FormLabel>Election Title:</FormLabel>
                <Input
                  name="electionTitle"
                  type="text"
                  placeholder="Enter Election Title"
                  onChange={formik.handleChange}
                  value={formik.values.electionTitle}
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Election Type:</FormLabel>
                <Box width="100%">
                  <Select
                    name="electionType"
                    options={electionTypeOptions}
                    onChange={(option) => {
                      formik.setFieldValue('electionType', option.value);
                      setElectionType(option.value);
                    }}
                    value={electionTypeOptions.find(
                      (option) => option.value === formik.values.electionType
                    )}
                    placeholder="Select Election Type"
                    isDark={colorMode === 'dark'} // Enable dark mode for Select
                  />
                </Box>
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Nomination Start Date:</FormLabel>
                <Input
                  name="nominationStartDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.nominationStartDate}
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Nomination End Date:</FormLabel>
                <Input
                  name="nominationEndDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.nominationEndDate}
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Election Start Date:</FormLabel>
                <Input
                  name="startDate"
                  type="datetime-local"
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Positions:</FormLabel>
                <Select
                  isMulti
                  name="positions"
                  options={positions}
                  onChange={(selectedOptions) => {
                    formik.setFieldValue(
                      'positions',
                      selectedOptions ? selectedOptions.map((option) => option.value) : []
                    );
                  }}
                  value={positions.filter((position) =>
                    formik.values.positions.includes(position.value)
                  )}
                  placeholder="Select positions..."
                  isDark={colorMode === 'dark'} // Enable dark mode for Select
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Committee Members:</FormLabel>
                <Box width="100%">
                  <Select
                    isMulti
                    options={students}
                    onChange={(selectedOptions) => {
                      formik.setFieldValue(
                        'committeeMembers',
                        selectedOptions ? selectedOptions.map((option) => option.value) : []
                      );
                    }}
                    value={students.filter((student) =>
                      formik.values.committeeMembers.includes(student.value)
                    )}
                    placeholder="Select members..."
                    isDark={colorMode === 'dark'} // Enable dark mode for Select
                  />
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" bg="#ce7348" color="white" mr={3}>
              Create Election
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateElection;
