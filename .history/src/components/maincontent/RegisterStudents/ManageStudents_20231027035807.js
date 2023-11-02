import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  useColorMode,
  Button,
} from '@chakra-ui/react';

const FullScreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ItemsPerPage = 10; // Number of items per page

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm, students]);

  const handleSort = (field) => {
    const sorted = [...filteredStudents].sort((a, b) =>
      a[field].toString().toLowerCase() > b[field].toString().toLowerCase() ? 1 : -1
    );
    setFilteredStudents(sorted);
    toast.info(`Sorted by ${field}.`);
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ItemsPerPage);
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <FullScreenContainer>
      <Input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID Number</Th>
            <Th onClick={() => handleSort('name')}>Student Name</Th>
            <Th>Email</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('level')}>Level</Th>
            <Th onClick={() => handleSort('cgpa')}>CGPA</Th>
            <Th>Hostel</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentStudents.map((student, index) => (
            <Tr key={student.id}>
              <Td>{startIndex + index + 1}</Td>
              <Td>{student.idNumber}</Td>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.department}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.level}</Td>
              <Td>{student.cgpa}</Td>
              <Td>{student.hostel}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        mt={2}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        mt={2}
      >
        Next Page
      </Button>
    </FullScreenContainer>
  );
};

export default ManageStudents;
