import { Button } from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaVoteYea } from 'react-icons/fa';
import { HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { supabase } from '../../../supabase';

const StudentVote = () => {

  useEffect(() => {
    fetchDataFromSupabase();
  }, []);

  const fetchDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from('positions').select('*');
      if (error) {
        throw error;
      }
      console.log(data);
      setAllPositions(data);
    } catch (error) {
      console.error('Error fetching data from Supabase:', error.message);
    }
  };

  const [allPositions, setAllPositions] = useState([]);

  return <div style={{
    display: "inline-flex",
    alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
  }}>

    <HStack spacing='24px' style={{ width: "90%", margin: "50px 0px 50px 0px" }}>

      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Vote</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

    </HStack>

    <Tabs style={{ width: "90%" }}>
      <TabList>
        <Tab>All</Tab>
        <Tab>General</Tab>
        <Tab>Departmental</Tab>
      </TabList>
    </Tabs>

    <br></br><br></br>


    <TableContainer style={{ width: "90%" }}>
      <Table variant='striped' size="lg">
        <TableCaption>Cast your votes</TableCaption>
        <Thead>
          <Tr style={{ textAlign: "start" }}>
            <Th>Role</Th>
            <Th>Action</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            allPositions.map((val) => (
              <Tr>
                <Td>{val.name}</Td>
                <Td>
                  <Link to={`/student-dashboard/vote-page/${"SUG President"}`}>
                    <Button colorScheme='yellow' variant='outline'><FaVoteYea /></Button>
                  </Link>
                </Td>
                <Td>Pending</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>


  </div>;
}

export default StudentVote;