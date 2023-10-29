import React, { useState } from 'react';
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

const ManageStudents = () => {
  const [students] = useState([
    {
      id: 1,
      name: 'Adebayo Johnson',
      matriculationNumber: '2021001',
      faculty: 'Engineering',
      department: 'Computer Science',
      level: '200',
      cgpa: '3.75',
      hostel: 'A-Block',
      phone: '08012345678',
    },
    {
      id: 2,
      name: 'Chinwe Okonkwo',
      matriculationNumber: '2021002',
      faculty: 'Social Sciences',
      department: 'Economics',
      level: '300',
      cgpa: '3.50',
      hostel: 'B-Block',
      phone: '08023456789',
    },
    {
      id: 3,
      name: 'Emeka Okafor',
      matriculationNumber: '2021003',
      faculty: 'Medicine',
      department: 'Pharmacy',
      level: '400',
      cgpa: '4.00',
      hostel: 'C-Block',
      phone: '08034567890',
    },
    {
      id: 4,
      name: 'Fatima Mohammed',
      matriculationNumber: '2021004',
      faculty: 'Law',
      department: 'Legal Studies',
      level: '500',
      cgpa: '3.90',
      hostel: 'D-Block',
      phone: '08045678901',
    },
    {
      id: 5,
      name: 'Ngozi Nwosu',
      matriculationNumber: '2021005',
      faculty: 'Science',
      department: 'Physics',
      level: '100',
      cgpa: '3.25',
      hostel: 'E-Block',
      phone: '08056789012',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { colorMode } = useColorMode();

  const handleSort = (field) => {
    // Add your sorting logic here
    console.log(`Sorting by ${field}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <HStack spacing={2} align="center" w="100">
        <Input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          ml="2"
          w="20%"
        />
      </HStack>

      <Table variant="simple" fontFamily="body">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th onClick={() => handleSort('name')}>Name</Th>
            <Th onClick={() => handleSort('matriculationNumber')}>
              Matriculation Number
            </Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <Th onClick={() => handleSort('level')}>Academic Level</Th>
            <Th onClick={() => handleSort('cgpa')}>CGPA</Th>
            <Th onClick={() => handleSort('hostel')}>Hostel</Th>
            <Th onClick={() => handleSort('phone')}>Phone Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student, index) => (
            <Tr key={student.id}>
              <Td>{index + 1}</Td>
              <Td>{student.name}</Td>
              <Td>{student.matriculationNumber}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.department}</Td>
              <Td>{student.level}</Td>
              <Td>{student.cgpa}</Td>
              <Td>{student.hostel}</Td>
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
              <Box>
                <h3>Student Details</h3>
                {/* Include student details here */}
              </Box>
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
