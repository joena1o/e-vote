import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Box, HStack, Input, Button, useColorModeFlex, Select } from '@chakra-ui/react';

const ManageStudents = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterField, setSelectedFilterField] = useState('FACULTY');

  const columns = [
    { Header: 'SN', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Matriculation Number', accessor: 'matriculationNumber' },
    { Header: 'Faculty', accessor: 'faculty' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Academic Level', accessor: 'level' },
    { Header: 'CGPA', accessor: 'cgpa' },
    { Header: 'Hostel', accessor: 'hostel' },
    { Header: 'Phone Number', accessor: 'phone' },
    { Header: 'State of Origin', accessor: 'stateOfOrigin' },
    { Header: 'LGA', accessor: 'lga' },
    { Header: 'Tribe', accessor: 'tribe' },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable({ columns, data, initialState: { sortBy: [{ id: 'name', desc: false }] } }, useSortBy);

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
  useEffect(() => {
    // Assuming you fetch your data here
    // const fetchData = async () => {
    //   const result = await fetch('yourApiEndpoint');
    //   const data = await result.json();
    //   setData(data.students);
    // };
    // fetchData();

    // For now, using mockStudents
    setData(mockStudents);
  }, []);

  const filterData = () => {
    return data.filter((student) =>
      student[selectedFilterField]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Box>
      <HStack spacing={2} align="center" w="100">
        {/* Your file upload section remains unchanged */}

        {/* Filter Dropdown by Field */}
        <Select
          placeholder="Filter by Field"
          value={selectedFilterField}
          onChange={(e) => setSelectedFilterField(e.target.value)}
          size="sm"
          ml="2"
          maxWidth="150px"
        >
          {/* Your options remain unchanged */}
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

      {/* React Table */}
      <table {...getTableProps()} variant="simple" fontFamily="body">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {filterData().map((student, index) => {
            prepareRow(student);
            return (
              <tr {...student.getRowProps()}>
                {student.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default ManageStudents;