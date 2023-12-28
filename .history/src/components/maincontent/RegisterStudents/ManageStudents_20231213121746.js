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
  ChakraProvider,
  SimpleGrid,
  Flex,
  Select,
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState('All');

  const [filters, setFilters] = useState({
    name: '',
    matriculationNumber: '',
    faculty: '',
    department: '',
    level: '',
    cgpa: '',
    hostel: '',
    phone: '',
    stateOfOrigin: '',
    lga: '',
    tribe: '',
  });

  const { colorMode } = useColorMode();

  const mockStudents = [
    // ... (mock data)
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file before uploading.');
      return;
    }

    // Your file upload logic here

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

    // Uncomment the line below to fetch real data from the API
    // fetchStudents();

    // Use mock data for demonstration
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  useEffect(() => {
    const results = students.filter((student) => {
      return Object.keys(filters).some((key) =>
        student[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      );
    });

    if (!results.length) {
      toast.info('No students found.');
    }

    setFilteredStudents(results);
  }, [filters, students]);

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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ChakraProvider>
      <Box>
        <HStack spacing={2} align="center" w="100">
          <Input
            type="file"
            accept=".csv"
            display="none"
            onChange={handleFileSelect}
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input">
            <Button
              as="span"
              colorScheme="yellow"
              variant="ghost"
              border="1px solid #8B4513"
              onClick={handleUpload}
              cursor="pointer"
            >
              Upload Students
            </Button>
          </label>

          {Object.keys(filters).map((key) => (
            <Input
              key={key}
              type="text"
              placeholder={`Search by ${key}...`}
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              size="xs"
              ml="2"
              w="20%"
            />
          ))}

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
              {Object.keys(mockStudents[0]).map((field) => (
                <Th key={field} onClick={() => handleSort(field)}>
                  {field}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {currentStudents.map((student, index) => (
              <Tr key={student.id}>
                {Object.values(student).map((value, i) => (
                  <Td key={i}>{value}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>

        <VStack mt={4}>
          <SimpleGrid columns={Math.ceil(filteredStudents.length / studentsPerPage)}>
            {Array.from(
              { length: Math.ceil(filteredStudents.length / studentsPerPage) },
              (_, index) => (
                <Button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Button>
              )
            )}
          </SimpleGrid>
        </VStack>

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
    </ChakraProvider>
  );
};

export default ManageStudents;
