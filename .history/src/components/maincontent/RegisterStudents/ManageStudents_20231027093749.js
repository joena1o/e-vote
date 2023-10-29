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
  ChakraProvider, // Import ChakraProvider
} from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flex } from '@chakra-ui/react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Track the selected file

  const { colorMode } = useColorMode();

  const mockStudents = [
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
  ];
  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file before uploading.');
      return;
    }

    // Add your file upload logic here
    // You can use the selectedFile variable to access the uploaded file

    // Simulate a success message
    toast.info('Students registered successfully!', { autoClose: 3000 });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Replace 'yourApiName' and '/path-to-your-endpoint' with your actual API information
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
    <ChakraProvider> {/* Wrap your component with ChakraProvider */}
      <Box>
        <HStack spacing={2} align="center" w="100">
          {/* Input for file selection */}
          <Input
            type="file"
            accept=".csv" // Specify the accepted file type
            display="none" // Hide the input visually
            onChange={handleFileSelect} // Handle file selection
            id="file-upload-input" // Add an ID for the label to reference
          />
          {/* Label for the file input */}
          <label htmlFor="file-upload-input">
            <Button
              as="span" // Use a button as the label
              colorScheme="yellow"
              variant="ghost"
              border="1px solid #8B4513"
              onClick={handleUpload}
              cursor="pointer" // Change cursor on hover
            >
              Upload Students
            </Button>
          </label>

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

        <Table variant="simple" fontFamily="body">
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th onClick={() => handleSort('name')}>Name</Th>
              <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
              <Th onClick={() => handleSort('faculty')}>Faculty</Th>
              <Th onClick={() => handleSort('department')}>Department</Th>
              <Th onClick={() => handleSort('level')}>Academic Level</Th>
              <Th onClick={() => handleSort('cgpa')}>CGPA</Th> {/* Add this line for CGPA */}
              <Th onClick={() => handleSort('hostel')}>Hostel</Th> {/* Add this line for Hostel */}
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
                <Td>{student.cgpa}</Td> {/* Add this line for CGPA */}
                <Td>{student.hostel}</Td> {/* Add this line for Hostel */}
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
      </Box>
    </ChakraProvider>
  );
};

export default ManageStudents;
