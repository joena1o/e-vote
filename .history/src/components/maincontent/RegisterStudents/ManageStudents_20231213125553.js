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
  const [selectedFilterField, setSelectedFilterField] = useState('FACULTY');
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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterStudentsByFilter = () => {
    let result = [...filteredStudents];

    if (selectedFilterField !== 'All' && columnFilters[selectedFilterField]) {
      result = result.filter((student) =>
        student[selectedFilterField]
          .toLowerCase()
          .includes(columnFilters[selectedFilterField].toLowerCase())
      );
    }

    return result;
  };

  const handleFilterFieldSelect = (field) => {
    setSelectedFilterField(field);
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

          {/* Filter Dropdown by Field */}
          <Select
            placeholder="Filter by Field"
            value={selectedFilterField}
            onChange={(e) => handleFilterFieldSelect(e.target.value)}
            size="sm"
            ml="2"
            maxWidth="150px"
          >
            <option value="FACULTY">FACULTY</option>
            <option value="DEPARTMENT">DEPARTMENT</option>
            <option value="level">ACADEMIC LEVEL</option>
            <option value="cgpa">CGPA</option>
            <option value="hostel">HOSTEL</option>
            <option value="phone">PHONE NUMBER</option>
            <option value="stateOfOrigin">STATE OF ORIGIN</option>
            <option value="lga">LGA</option>
            <option value="tribe">TRIBE</option>
          </Select>

          {/* Input for search term */}
          <Flex justifyContent="flex-end" flex="1">
            <Input
              type="text"
              placeholder={`Search by ${selectedFilterField.toLowerCase()}`}
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
