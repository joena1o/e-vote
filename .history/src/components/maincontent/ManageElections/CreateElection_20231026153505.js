import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [elections, setElections] = useState([]);

  const formik = useFormik({
    initialValues: {
      electionTitle: '',
      electionType: '',
      nominationStartDate: '',
      nominationEndDate: '',
      name: '',
      startDate: '', // Start Date
      positions: [],
      committeeMembers: [],
    },
    validationSchema: Yup.object({
      electionTitle: Yup.string().required('Required'),
      electionType: Yup.string().required('Required'),
      nominationStartDate: Yup.date().required('Required'),
      nominationEndDate: Yup.date().required('Required'),
      name: Yup.string().when('electionType', {
        is: (val) => val === 'faculty' || val === 'department',
        then: Yup.string().required('Required'),
        otherwise: Yup.string(),
      }),
      startDate: Yup.string().required('Required'), // Changed from Yup.date() to Yup.string()
      positions: Yup.array().min(1, 'At least one position is required'),
      committeeMembers: Yup.array(),
    }),
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
                {formik.errors.electionTitle && <Text color="red.500">{formik.errors.electionTitle}</Text>}
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
                  />
                </Box>
                {formik.errors.electionType && <Text color="red.500">{formik.errors.electionType}</Text>}
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Nomination Start Date:</FormLabel>
                <Input
                  name="nominationStartDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.nominationStartDate}
                />
                {formik.errors.nominationStartDate && <Text color="red.500">{formik.errors.nominationStartDate}</Text>}
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Nomination End Date:</FormLabel>
                <Input
                  name="nominationEndDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.nominationEndDate}
                />
                {formik.errors.nominationEndDate && <Text color="red.500">{formik.errors.nominationEndDate}</Text>}
              </FormControl>

              {(electionType === 'faculty' || electionType === 'department') && (
                <FormControl width="100%">
                  <FormLabel>{electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name && <Text color="red.500">{formik.errors.name}</Text>}
                </FormControl>
              )}

              <FormControl width="100%">
                <FormLabel>Election Start Date:</FormLabel>
                <Input
                  name="startDate"
                  type="datetime-local"
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                />
                {formik.errors.startDate && <Text color="red.500">{formik.errors.startDate}</Text>}
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
                />
                {formik.errors.positions && <Text color="red.500">{formik.errors.positions}</Text>}
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
                  />
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" bg="#ce7348" color="white" mr={3}>
              Create Election
            </Button>
            <Button variant="ghost" onClick={() => setModalIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateElection;
