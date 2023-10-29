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
      positions: [], // Ensure this is initialized as an array
      committeeMembers: [],
      endDate: '',
    },
    validationSchema: Yup.object({
      electionTitle: Yup.string().required('Required'),
      electionType: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      positions: Yup.array().required('Required'),
      endDate: Yup.date().required('Required'),
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

  const positions = [
    { value: 'President', label: 'President' },
    { value: 'Vice President', label: 'Vice President' },
    // ... add other positions as needed
  ];

 
  
  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>Open Election Form</Button>

      <Box width="100%" mt={5}>
        {/* Displaying elections table */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Name of Election</Th>
              <Th>Type of Election</Th>
              <Th>Positions Added</Th>
              <Th>Election Date</Th>
              <Th>End Election Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {elections.map((election, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{election.electionTitle}</Td>
                <Td>{election.electionType}</Td>
                <Td>{election.positions.join(', ')}</Td>
                <Td>{election.startDate}</Td>
                <Td>{election.endDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Election Creation Modal */}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} size="md">
        {/* Set size to "md" for a smaller modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Election</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={formik.handleSubmit}>
            {/* Form elements */}
            <FormControl>
              <FormLabel><FiType /> Title:</FormLabel>
              <Input
                name="electionTitle"
                type="text"
                placeholder="Enter Election Title"
                onChange={formik.handleChange}
                value={formik.values.electionTitle}
              />
              {formik.errors.electionTitle && <Text color="red.500">{formik.errors.electionTitle}</Text>}
            </FormControl>

            <FormControl>
              <FormLabel><FiFileText /> Type:</FormLabel>
              <Box width="100%">
                <Select
                  name="electionType"
                  options={electionTypeOptions}
                  onChange={(option) => {
                    formik.setFieldValue("electionType", option.value);
                    setElectionType(option.value);
                  }}
                  value={electionTypeOptions.find(
                    option => option.value === formik.values.electionType
                  )}
                  placeholder="Select Type"
                />
              </Box>
              {formik.errors.electionType && <Text color="red.500">{formik.errors.electionType}</Text>}
            </FormControl>

            <FormControl>
              <FormLabel><FiCalendar /> Election Date:</FormLabel>
              <Input
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.startDate}
              />
              {formik.errors.startDate && <Text color="red.500">{formik.errors.startDate}</Text>}
            </FormControl>

            {(electionType === 'faculty' || electionType === 'department') && (
              <FormControl>
                <FormLabel><FiClipboard /> {electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:</FormLabel>
                <Input
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && <Text color="red.500">{formik.errors.name}</Text>}
              </FormControl>
            )}

            {/* Remaining form fields remain unchanged */}

          </ModalBody>
          <ModalFooter>
            {/* Create Election and Cancel buttons */}
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
