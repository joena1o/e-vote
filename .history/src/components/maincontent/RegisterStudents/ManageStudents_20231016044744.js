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
  font-weight: bold; /* Make the font bold */
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  font-weight: bold; /* Make the font bold */
`;

const SerialNumberTd = styled(Td)`
  width: 50px; /* Adjust the width for the serial number column */
`;

const NameTd = styled(Td)`
  /* Adjust the width as needed for the Name column */
  min-width: 150px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ShorterTd = styled(Td)`
  width: 100px; /* Adjust the width as needed for Academic Level */
`;

const WiderTd = styled(Td)`
  /* Adjust the width as needed for Phone Number */
  min-width: 150px;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Input = styled.input`
  margin-bottom: 10px; /* Adjust the margin as needed */
  padding: 6px; /* Adjust the padding as needed */
  margin-left: auto;
  font-size: 12px; /* Adjust the font size to make it smaller */
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
            <SerialNumberTd>SN</SerialNumberTd> {/* Serial Number Column */}
            <NameTd onClick={() => handleSort('name')}>Name</NameTd> {/* Name Column */}
            <Th onClick={() => handleSort('matriculationNumber')}>Matriculation Number</Th>
            <Th onClick={() => handleSort('faculty')}>Faculty</Th>
            <Th onClick={() => handleSort('department')}>Department</Th>
            <ShorterTd onClick={() => handleSort('academic level')}>Academic Level</ShorterTd>
            <WiderTd onClick={() => handleSort('phone number')}>Phone Number</WiderTd>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id}>
              <SerialNumberTd>{index + 1}</SerialNumberTd> {/* Serial Number */}
              <NameTd>{student.name}</NameTd> {/* Name */}
              <Td>{student.matriculationNumber}</Td>
              <Td>{student.faculty}</Td>
              <Td>{student.department}</Td>
              <ShorterTd>{student.level}</ShorterTd>
              <WiderTd>{student.phone}</WiderTd>
            </tr>
          ))}
        </tbody>
      </Table>
    </FullScreenContainer>
  );
};

export default ManageStudents;
