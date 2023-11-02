import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  cursor: pointer;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  width: 100%; /* Set the width to 100% to make it span the entire container */
  text-align: right; /* Align the text to the right */
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end; /* Align the content to the right */
  align-items: center;
`;

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);

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
    const results = students.filter(student =>
      Object.values(student).some(value =>
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

  return (
    <Container>
      <h1>Manage Registered Students</h1>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort('name')}>Name</Th>
            <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <Th onClick={() => handleSort('level')}>Academic Level</Th>
            <Th onClick={() => handleSort('email')}>Email</Th>
            <Th onClick={() => handleSort('phone')}>Phone</Th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <Td>{student.name}</Td>
              <Td>{student.matriculationNumber}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.department}</Td>
              <Td>{student.level}</Td>
              <Td>{student.email}</Td>
              <Td>{student.phone}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageStudents;
