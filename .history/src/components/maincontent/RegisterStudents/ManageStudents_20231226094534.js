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
  VStack,
  HStack,
  Button,
  ChakraProvider,
  SimpleGrid,
  Flex,
  Select,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
      stateOfOrigin: 'Lagos',
      lga: 'Ikeja',
      tribe: 'Yoruba',
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
      stateOfOrigin: 'Anambra',
      lga: 'Onitsha',
      tribe: 'Igbo',
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
      stateOfOrigin: 'Enugu',
      lga: 'Nsukka',
      tribe: 'Igbo',
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
      stateOfOrigin: 'Kano',
      lga: 'Kano Municipal',
      tribe: 'Hausa',
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
      stateOfOrigin: 'Imo',
      lga: 'Owerri',
      tribe: 'Igbo',
    },
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
    // Fetch real data from the API or use mock data
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
            {/* ... (other filter options) */}
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
              <Th onClick={() => handleSort('name')} cursor="pointer">
                Name
                {sortField === 'name' && <FiEye />}
              </Th>
              {/* ... (other headers with sorting) */}
            </Tr>
          </Thead>

          <Tbody>
            {filterStudentsByFilter().map((student, index) => (
              <Tr key={student.id}>
                <Td>{indexOfFirstStudent + index + 1}</Td>
                <Td>{student.name}</Td>
                {/* ... (other columns) */}
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
