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
  IconButton,
} from '@chakra-ui/react';
import { FiEye, FiUpload } from 'react-icons/fi'; // Import FiUpload icon
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flex } from '@chakra-ui/react';
import { Upload } from 'chakra-ui-upload';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New state for success modal
  const { colorMode } = useColorMode();

  const handleUpload = (file) => {
    // Your file upload logic here
    // For example, you can simulate success after a delay
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 2000); // Simulate a 2-second delay, replace with actual upload logic
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

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
    <Box>
      <HStack spacing={2} align="center" w="100">
        <Upload onUpload={handleUpload} accept=".csv">
          <Button
            colorScheme="yellow"
            variant="ghost"
            border="1px solid #8B4513"
            leftIcon={<FiUpload />} // Use FiUpload icon
          >
            Upload Students
          </Button>
        </Upload>

        <Flex justifyContent="flex-end" flex="1">
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="xs"
            ml="2"
            w="20%"
          />
        </Flex>
      </HStack>

      <Table variant="simple">
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
              {/* Your modal content goes here */}
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
      <Modal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <h3>File uploaded successfully!</h3>
              {/* You can include additional success message or actions here */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={closeSuccessModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManageStudents;
