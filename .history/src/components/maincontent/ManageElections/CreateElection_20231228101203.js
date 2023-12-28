import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';
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
  useColorMode,
  IconButton,
} from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType, FiEye } from 'react-icons/fi';

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [elections, setElections] = useState([]);
  const { colorMode } = useColorMode();

  const initialElections = [
    {
      electionTitle: 'Student Council Elections',
      electionType: 'general',
      nominationStartDate: '2023-10-15',
      nominationEndDate: '2023-10-20',
      electionDate: '2023-11-05T10:00',
      positions: ['President', 'Vice President'],
      committeeMembers: ['Pascal@example.com', 'Prisca@example.com'],
    },
    {
      electionTitle: 'Faculty Representative Election',
      electionType: 'faculty',
      nominationStartDate: '2023-09-20',
      nominationEndDate: '2023-09-30',
      electionDate: '2023-10-15T14:30',
      positions: ['Faculty President', 'Faculty Secretary'],
      committeeMembers: ['Pascal@example.com', 'Prisca@example.com'],
    },
    // Add more mock elections as needed
  ];

  const formik = useFormik({
    initialValues: {
      electionTitle: '',
      electionType: '',
      nominationStartDate: '',
      nominationEndDate: '',
      electionDate: '',
      positions: [],
      committeeMembers: [],
    },
    onSubmit: async (values) => {
      // Close the modal
      setModalIsOpen(false);

      // Update the elections state
      setElections([...elections, values]);
    },
  });

  const electionTypeOptions = [
    { value: 'general', label: 'General Elections' },
    { value: 'senate_department', label: 'Senate Election (Department)' },
    { value: 'senate_hall', label: 'Senate Election (Hall)' },
    { value: 'faculty', label: 'Faculty Election' },
    { value: 'departmental', label: 'Departmental Election' },
  ];
  

  const students = [
    { value: 'Pascal@example.com', label: 'Prisca Ahmadu' },
    { value: 'Prisca@example.com', label: 'Paul Ahmadu' },
  ];

  const positions = [
    { value: 'President', label: 'President' },
    { value: 'Vice President', label: 'Vice President' },
  ];

  const handleManageElection = (election) => {
    // Replace this with your logic to manage the election
    console.log('Managing election:', election);
  };

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)} mt={5} bg="yellow.500" color="black">
        Open Create Election Form
      </Button>

      <Box width="100%" mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="smaller-title">S/N</Th>
              <Th className="smaller-title">Election Title</Th>
              <Th className="smaller-title">Election Type</Th>
              <Th className="smaller-title">Positions Added</Th>
              <Th className="smaller-title">Nomination Start Date</Th>
              <Th className="smaller-title">Nomination End Date</Th>
              <Th className="smaller-title">Election Date</Th>
              <Th className="smaller-title">Election Committee</Th>
              <Th className="smaller-title">Manage Election</Th>
            </Tr>
          </Thead>
          <Tbody>
            {initialElections.map((election, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{election.electionTitle}</Td>
                <Td>{election.electionType}</Td>
                <Td>{election.positions.join(', ')}</Td>
                <Td>{election.nominationStartDate}</Td>
                <Td>{election.nominationEndDate}</Td>
                <Td>{election.electionDate}</Td>
                <Td>{election.committeeMembers.join(', ')}</Td>
                <Td>
                  <IconButton
                    aria-label="Manage Election"
                    icon={<FiEye />}
                    variant="ghost"
                    colorScheme="yellow"
                    onClick={() => handleManageElection(election)}
                  />
                </Td>
              </Tr>
            ))}
            {elections.map((election, index) => (
              <Tr key={index + initialElections.length}>
                <Td>{index + initialElections.length + 1}</Td>
                <Td>{election.electionTitle}</Td>
                <Td>{election.electionType}</Td>
                <Td>{election.positions.join(', ')}</Td>
                <Td>{election.nominationStartDate}</Td>
                <Td>{election.nominationEndDate}</Td>
                <Td>{election.electionDate}</Td>
                <Td>{election.committeeMembers.join(', ')}</Td>
                <Td>
                  <IconButton
                    aria-label="Manage Election"
                    icon={<FiEye />}
                    variant="ghost"
                    colorScheme="yellow"
                    onClick={() => handleManageElection(election)}
                  />
                </Td>
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
                    isDark={colorMode === 'dark'}
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
                <FormLabel>Election Date:</FormLabel>
                <Input
                  name="electionDate"
                  type="datetime-local"
                  onChange={formik.handleChange}
                  value={formik.values.electionDate}
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
                  isDark={colorMode === 'dark'}
                />
              </FormControl>

              <FormControl width="100%">
                <FormLabel>Election Committee:</FormLabel>
                <Box width="100%">
                  <Select
                    isMulti
                    options={students}
                    name="committeeMembers"
                    onChange={(selectedOptions) => {
                      formik.setFieldValue(
                        'committeeMembers',
                        selectedOptions ? selectedOptions.map((option) => option.value) : []
                      );
                    }}
                    value={students.filter((student) =>
                      formik.values.committeeMembers.includes(student.value)
                    )}
                    placeholder="Select committee members..."
                    isDark={colorMode === 'dark'}
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
