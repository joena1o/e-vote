import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import { HStack } from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../../supabase';
import { CircularProgress } from '@chakra-ui/react';


function NominationPage() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { electionId } = useParams();
  const [loading, setLoadingStatus] = useState(false);


  useEffect(() => {
    fetchDataFromSupabase();
  }, []);

  const fetchDataFromSupabase = async () => {
    setLoadingStatus(true);
    try {
      const { data,  error } = await supabase.from('elections')
      .select("*")
      .eq('id', electionId);
      if (error) {
        throw error;
      }
      setLoadingStatus(false);
      console.log(data[0].positions);
      setAllPositions(data[0].positions);
    } catch (error) {
      setLoadingStatus(false);
      console.error('Error fetching data from Supabase:', error.message);
    }
  };

  const [ allPositions, setAllPositions ] = useState([]);
  

  return <div style={{
    display: "inline-flex",
    alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
  }}>

    <HStack spacing='24px' style={{width:"90%", margin:"50px 0px 50px 0px"}}>

      <Breadcrumb>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='#'>Nomination</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Election</BreadcrumbLink>
      </BreadcrumbItem>

      </Breadcrumb>

    </HStack>


    <TableContainer style={{ width: "90%" }}>
      { !loading ? <Table variant='striped' size="lg">
        <TableCaption>Available Positions</TableCaption>
        <Thead>
          <Tr style={{ textAlign: "start" }}>
            <Th>Aspiring Position</Th>
            <Th>View</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            allPositions.map((position)=>(
              <Tr>
                <Td>{position}</Td>
                <Td><Link to={`/student-dashboard/nominees-page/${position}`} ><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td>
                <Td><Link to={`/student-dashboard/election-application-page/${position}/${electionId}/${position}`} ><Button colorScheme='yellow'>Nominate</Button></Link></Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table> : <CircularProgress isIndeterminate /> }
    </TableContainer>


    <br></br><br></br>



    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Candidate Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>

            <FormLabel>Fullname</FormLabel>
            <Input type='email' />
            <br></br><br></br>
            <FormLabel>ID No.</FormLabel>
            <Input type='email' />
            <br></br><br></br>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
            <br></br><br></br>
            <Select placeholder='Aspiring Position'>
              <option value='option1'>Sports Director</option>
              <option value='option2'>Director of social</option>
              <option value='option3'>President</option>
            </Select>

          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={onClose}>
            Nominate
          </Button>
          <Button variant='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </div>;
}

export default NominationPage;