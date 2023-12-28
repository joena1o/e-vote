import React, { useEffect, useState } from 'react';
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
import { API } from 'aws-amplify';

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
  const [columnFilters, setColumnFilters] = useState({});
  const { colorMode } = useColorMode();

  const mockStudents = [
    // ... (your mock data)
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
    // Fetch students from API
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
    setSortField(field);
    toast.info(`Sorted by ${field}.`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterStudents = () => {
    let result = [...students];

    if (selectedFilter !== 'All') {
      result = result.filter((student) => student.level === selectedFilter);
    }

    if (selectedFacultyFilter !== 'All') {
      result = result.filter((student) => student.faculty === selectedFacultyFilter);
    }

    Object.keys(columnFilters).forEach((key) => {
      if (columnFilters[key] && columnFilters[key] !== 'All') {
        result = result.filter(
          (student) => student[key].toLowerCase().includes(columnFilters[key].toLowerCase())
        );
      }
    });

    return result;
  };

  const handleSearch = (e, field) => {
    const value = e.target.value;

    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));

    // Rest of your search logic...
  };

  const getUniqueValues = (field) => {
    const uniqueValues = [...new Set(students.map((student) => student[field]))];
    return ['All', ...uniqueValues];
  };

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

          <Select
            placeholder="Filter by Level"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            size="sm"
            ml="2"
            maxWidth="150px"
          >
            {getUniqueValues('level').map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Faculty"
            value={selectedFacultyFilter}
            onChange={(e) => setSelectedFacultyFilter(e.target.value)}
            size="sm"
            ml="2"
            maxWidth="150px"
          >
            {getUniqueValues('faculty').map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>

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
              <Th>
                Name
                <Input
                  type="text"
                  placeholder="Filter"
                  value={columnFilters.name || ''}
                  onChange={(e) => handleSearch(e, 'name')}
                />
              </Th>
              {/* Add cells for other columns */}
            </Tr>
          </Thead>

          <Tbody>
            {filterStudents().map((student, index) => (
              <Tr key={student.id}>
                <Td>{index + 1}</Td>
                <Td>{student.name}</Td>
                {/* Add cells for other columns */}
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination */}
        <VStack mt={4}>
          <SimpleGrid columns={Math.ceil(filterStudents().length / studentsPerPage)}>
            {Array.from(
              { length: Math.ceil(filterStudents().length / studentsPerPage) },
              (_, index) => (
                <Button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Button>
              )
            )}
          </SimpleGrid>
        </VStack>

        {/* Modal for managing students */}
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
