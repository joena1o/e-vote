import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullScreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 10px; /* Adjust the font size as needed */
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

const ShorterTd = styled(Td)`
  width: 100px; /* Adjust the width as needed for Academic Level */
`;

const WiderTd = styled(Td)`
  width: 250px; /* Adjust the width as needed for Email */
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  margin-left: auto;
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
    <FullScreenContainer>

      <Input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort('name')}>Name</Th>
            <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <ShorterTd onClick={() => handleSort('academic level')}>academic level</ShorterTd>
            <Th onClick={() => handleSort('email address')}>Email Address</Th>
            <WiderTd onClick={() => handleSort('phone number')}>Phone Number</WiderTd>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <Td>{student.name}</Td>
              <Td>{student.matriculationNumber}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.department}</Td>
              <ShorterTd>{student.level}</ShorterTd>
              <Td>{student.email}</Td>
              <WiderTd>{student.phone}</WiderTd>
            </tr>
          ))}
        </tbody>
      </Table>
    </FullScreenContainer>
  );
};

export default ManageStudents;
