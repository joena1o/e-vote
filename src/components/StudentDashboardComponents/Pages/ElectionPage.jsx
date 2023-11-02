import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TabPanel, TabPanels, Stack, TableContainer } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const buttonStyle = {
  padding: "10px",
  margin: "50px 40px"
};


function ElectionPage() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isOpen, onOpen, onClose } = useDisclosure()


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
      <Table variant='striped' size="lg">
        <TableCaption>Available Positions</TableCaption>
        <Thead>
          <Tr style={{ textAlign: "start" }}>
            <Th>Aspiring Position</Th>
            <Th isNumeric>Session</Th>
            <Th>Nominees</Th>
            <Th>View</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>SUG President</Td>
            <Td>2022/2023</Td>
            <Td>19 candidates</Td>
            <Td><Link to={`/student-dashboard/nominees-page/${"SUG President"}`}><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td>
            <Td><Link to={`/student-dashboard/election-application-page/${"SUG President"}`}><Button colorScheme='yellow'>Apply</Button></Link></Td>
          </Tr>
          <Tr>
            <Td>Director Of Social</Td>
            <Td>2022/2023</Td>
            <Td>19 candidates</Td>
            <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
            <Td><Link to={`/student-dashboard/election-application-page/${"SUG President"}`}><Button colorScheme='yellow'>Apply</Button></Link></Td>
          </Tr>
          <Tr>
            <Td>Director Of Sports</Td>
            <Td>2022/2023</Td>
            <Td>19 candidates</Td>
            <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
            <Td><Link to={`/student-dashboard/election-application-page/${"SUG President"}`}><Button colorScheme='yellow'>Apply</Button></Link></Td>
          </Tr>

          <Tr>
            <Td>Treasurer</Td>
            <Td>2022/2023</Td>
            <Td>19 candidates</Td>
            <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
            <Td><Link to={`/student-dashboard/election-application-page/${"SUG President"}`}><Button colorScheme='yellow'>Apply</Button></Link></Td>
          </Tr>

          <Tr>
            <Td>Financial Secretary</Td>
            <Td>2022/2023</Td>
            <Td>19 candidates</Td>
            <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
            <Td><Link to={`/student-dashboard/election-application-page/${"SUG President"}`}><Button colorScheme='yellow'>Apply</Button></Link></Td>
          </Tr>
        </Tbody>
      </Table>
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

export default ElectionPage;;