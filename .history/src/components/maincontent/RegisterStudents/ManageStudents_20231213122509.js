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
  // State to store students data
  const [students, setStudents] = useState([]);
  // State to store filtered students data
  const [filteredStudents, setFilteredStudents] = useState([]);
  // State for search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for sorting field
  const [sortField, setSortField] = useState(null);
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for selected file to upload
  const [selectedFile, setSelectedFile] = useState(null);
  // State for current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Number of students per page
  const [studentsPerPage] = useState(5);
  // State for selected level filter
  const [selectedFilter, setSelectedFilter] = useState('All');
  // State for selected faculty filter
  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState('All');
  // State for column filters
  const [columnFilters, setColumnFilters] = useState({});

  // Color mode
  const { colorMode } = useColorMode();

  // Mock students data (replace this with API call)
  const mockStudents = [
    // ... (your mock data)
  ];

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file before uploading.');
      return;
    }

    // Your file upload logic here

    toast.info('Students registered successfully!', { autoClose: 3000 });
  };

  // Function to fetch students data (replace this with actual API call)
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

  // Function to filter students based on search term and update filteredStudents state
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

  // Function to sort students based on a specified field
  const handleSort = (field) => {
    const sorted = [...filteredStudents].sort((a, b) =>
      a[field].toString().toLowerCase() > b[field].toString().toLowerCase() ? 1 : -1
    );
    setFilteredStudents(sorted);
    setSortField(field);
    toast.info(`Sorted by ${field}.`);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to paginate students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Function to change current page in pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to filter students based on selected criteria
  const filterStudentsByFilter = () => {
    let result = [...filteredStudents];

    // Filter by selected level
    if (selectedFilter !== 'All') {
      result = result.filter((student) => student.level === selectedFilter);
    }

    // Filter by selected faculty
    if (selectedFacultyFilter !== 'All') {
      result = result.filter((student) => student.faculty === selectedFacultyFilter);
    }

    // Filter by input fields for each column
    Object.keys(columnFilters).forEach((key) => {
      if (columnFilters[key]) {
        result = result.filter((student) =>
          student[key].toLowerCase().includes(columnFilters[key].toLowerCase())
        );
      }
    });

    return result;
  };

  return (
    <ChakraProvider>
      <Box>
        <HStack spacing={2} align="center" w="100">
          {/* Input for file upload */}
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

          {/* Filter Dropdown by Level */}
          <Select
            placeholder="Filter by Level"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            size="sm"
            ml="2"
            maxWidth="150px" // Adjust the width as needed
          >
            <option value="All">All</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </Select>

          {/* Filter Dropdown by Faculty */}
          <Select
            placeholder="Filter by Faculty"
            value={selectedFacultyFilter}
            onChange={(e) => setSelectedFacultyFilter(e.target.value)}
            size="sm"
            ml="2"
            maxWidth="150px" // Adjust the width as needed
          >
            <option value="All">All</option>
            <option value="Engineering">Engineering</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Medicine">Medicine</option>
            {/* Add more faculty options as needed */}
          </Select>

          {/* Input for search term */}
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

        {/* Table for displaying students */}
        <Table variant="simple" fontFamily="body">
          <Thead>
            <Tr>
              <Th>SN</Th>
              {/* Table headers with sorting functionality */}
              <Th onClick={() => handleSort('name')}>Name</Th>
              <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
              <Th onClick={() => handleSort('faculty')}>Faculty</Th>
              <Th onClick={() => handleSort('department')}>Department</Th>
              <Th onClick={() => handleSort('level')}>Academic Level</Th>
              <Th onClick={() => handleSort('cgpa')}>CGPA</Th>
              <Th onClick={() => handleSort('hostel')}>Hostel</Th>
              <Th onClick={() => handleSort('phone')}>Phone Number</Th>
              <Th onClick={() => handleSort('stateOfOrigin')}>State of Origin</Th>
              <Th onClick={() => handleSort('lga')}>LGA</Th>
              <Th onClick={() => handleSort('tribe')}>Tribe</Th>
            </Tr>
          </Thead>

          {/* Table body with student data */}
          <Tbody>
            {filterStudentsByFilter().map((student, index) => (
              <Tr key={student.id}>
                <Td>{indexOfFirstStudent + index + 1}</Td>
                <Td>{student.name}</Td>
                <Td>{student.matriculationNumber}</Td>
                <Td>{student.faculty}</Td>
                <Td>{student.department}</Td>
                <Td>{student.level}</Td>
                <Td>{student.cgpa}</Td>
                <Td>{student.hostel}</Td>
                <Td>{student.phone}</Td>
                <Td>{student.stateOfOrigin}</Td>
                <Td>{student.lga}</Td>
                <Td>{student.tribe}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Pagination */}
        <VStack mt={4}>
          <SimpleGrid columns={Math.ceil(filterStudentsByFilter().length / studentsPerPage)}>
            {Array.from(
              { length: Math.ceil(filterStudentsByFilter().length / studentsPerPage) },
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
