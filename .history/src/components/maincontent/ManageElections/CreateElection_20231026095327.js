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
  useColorMode, 
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Flex,
  Text
} from '@chakra-ui/react';
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
      name: '',
      startDate: '',
      position: '',
      committeeMembers: [],
      endDate: '', // Added this field for end date
    },
    validationSchema: Yup.object({
      electionTitle: Yup.string().required('Required'),
      electionType: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      position: Yup.string().required('Required'),
      endDate: Yup.date().required('Required'), // Validation for end date
    }),
    onSubmit: async (values) => {
      setModalIsOpen(true);
      setElections([...elections, values]);
    },
  });

  const electionTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' }
  ];
  
  const students = [
    { value: 'Pascal@example.com', label: 'Prisca Ahmadu' },
    { value: 'Prisca@example.com', label: 'Paul Ahmadu' },
  ];

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>Open Election Form</Button>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Name of Election</Th>
            <Th>Type of Election</Th>
            <Th>Positions Added</Th>
            <Th>Start Election Date</Th>
            <Th>End Election Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {elections.map((election, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{election.electionTitle}</Td>
              <Td>{election.electionType}</Td>
              <Td>{election.position}</Td>
              <Td>{election.startDate}</Td>
              <Td>{election.endDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Election</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* ... rest of your form fields ... */}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
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
