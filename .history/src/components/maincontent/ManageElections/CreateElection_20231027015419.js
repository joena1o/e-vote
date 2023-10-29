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
  IconButton,  // Import IconButton
} from '@chakra-ui/react';
import {
  FiCalendar,
  FiUsers,
  FiFileText,
  FiUserCheck,
  FiClipboard,
  FiType,
  FiEdit,  // Import FiEdit for the Edit icon
  FiTrash2, // Import FiTrash2 for the Delete icon
} from 'react-icons/fi';

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [elections, setElections] = useState([]);
  const { colorMode } = useColorMode();

  const initialElections = [
    // Mock election data
    {
      electionTitle: 'Student Council Elections',
      electionType: 'general',
      nominationStartDate: '2023-10-15',
      nominationEndDate: '2023-10-20',
      electionDate: '2023-11-05T10:00',
      positions: ['President', 'Vice President'],
      committeeMembers: [],
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
    // Add more mock elections here
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
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' },
    { value: 'hall', label: 'Hall' },
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

  const handleEditElection = (election) => {
    // Replace this with your logic to edit the election
    console.log('Editing election:', election);
  };

  const handleDeleteElection = (index) => {
    // Remove the election at the specified index
    const updatedElections = [...elections];
    updatedElections.splice(index, 1);
    setElections(updatedElections);
  };

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)} mt={5}>
        Open Election Form
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
              <Th className="smaller-title">Actions</Th> {/* Added Actions column */}
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
                <Td>
                  {/* Added action buttons */}
                  <IconButton
                    icon={<FiEdit />}
                    onClick={() => handleEditElection(election)}
                    aria-label="Edit Election"
                    mr={2}
                    variant="ghost"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => handleDeleteElection(index)}
                    aria-label="Delete Election"
                    variant="ghost"
                  />
                </Td>
              </Tr>
            ))}
            {elections.map((election, index) => (
              <Tr key={index}>
                <Td>{index + 1 + initialElections.length}</Td>
                <Td>{election.electionTitle}</Td>
                <Td>{election.electionType}</Td>
                <Td>{election.positions.join(', ')}</Td>
                <Td>{election.nominationStartDate}</Td>
                <Td>{election.nominationEndDate}</Td>
                <Td>{election.electionDate}</Td>
                <Td>
                  {/* Added action buttons */}
                  <IconButton
                    icon={<FiEdit />}
                    onClick={() => handleEditElection(election)}
                    aria-label="Edit Election"
                    mr={2}
                    variant="ghost"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => handleDeleteElection(index + initialElections.length)}
                    aria-label="Delete Election"
                    variant="ghost"
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
              {/* ... rest of the form fields ... */}
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
