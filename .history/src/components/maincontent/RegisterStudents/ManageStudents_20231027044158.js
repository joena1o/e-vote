import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useColorMode,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const apiData = await API.get('yourApiName', '/path-to-your-endpoint');
        setStudents(apiData.students);
        setFilteredStudents(apiData.students);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const results = students.filter((student) =>
      Object.values(student).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    if (!results.length) {
      toast.info('No students found.');
    }
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const handleSort = (field) => {
    const sorted = [...filteredStudents].sort((a, b) =>
      a[field].toString().toLowerCase() > b[field].toString().toLowerCase() ? 1 : -1
    );
    setFilteredStudents(sorted);
    toast.info(`Sorted by ${field}.`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="sm"
        mr={2} // Add margin to the right
      />
      <IconButton
        aria-label="Manage Students"
        icon={<FiEye />}
        variant="ghost"
        colorScheme="yellow"
        onClick={openModal}
      />
      <Table variant="simple" flex="1">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th onClick={() => handleSort('name')}>Name</Th>
            <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <Th onClick={() => handleSort('level')}>Academic Level</Th>
            <Th onClick={() => handleSort('phone')}>Phone Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredStudents.map((student, index) => (
            <Tr key={student.id}>
              <Td>{index + 1}</Td>
              <Td>{student.name}</Td>
              <Td>{student.matriculationNumber}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.department}</Td>
              <Td>{student.level}</Td>
              <Td>{student.phone}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Manage Students</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <VStack spacing={4}>
        {/* Student Details */}
        <Box>
          <h3>Student Details</h3>
          {/* Display student details here */}
          <p>Name: John Doe</p>
          <p>Matriculation Number: 12345</p>
          {/* Add more details as needed */}
        </Box>
        {/* Actions */}
        <Box>
          <h3>Actions</h3>
          <Button colorScheme="blue" mr={3}>
            Edit
          </Button>
          <Button colorScheme="red">Delete</Button>
        </Box>
      </VStack>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="yellow" onClick={closeModal}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
};

export default ManageStudents;
