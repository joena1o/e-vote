import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import {FaVoteYea} from 'react-icons/fa';
import { HStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const StudentVote = () =>{

    // const { data } = useParams();

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
            <BreadcrumbLink href='#'>Vote</BreadcrumbLink>
          </BreadcrumbItem>

          </Breadcrumb>

      </HStack>

    <Tabs style={{width:"90%"}}>
        <TabList>
            <Tab>All</Tab>
            <Tab>General</Tab>
            <Tab>Departmental</Tab>
        </TabList>
    </Tabs>

    <br></br><br></br>


    <TableContainer style={{width:"90%"}}>
  <Table variant='striped' size="lg">
    <TableCaption>Cast your votes</TableCaption>
    <Thead>
      <Tr style={{textAlign:"start"}}>
        <Th>Role</Th>
        <Th>Action</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
        <Tr>
        <Td>SUG President</Td>
        <Td>
            <Link to={`/student-dashboard/vote-page/${"SUG President"}`}>
            <Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button>
            </Link>
        </Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Sports Director</Td>
        <Td>
          <Link to={`/student-dashboard/vote-page/${"Sports Director"}`}>
            <Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button>
            </Link>
        </Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Director Of Social</Td>
        <Td>
        <Link to={`/student-dashboard/vote-page/${"Director Of Social"}`}>
            <Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button>
        </Link>
        </Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Financial Secretary</Td>
        <Td>
        <Link to={`/student-dashboard/vote-page/${"Financial Secretary"}`}>
            <Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button>
        </Link>
        </Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Treasurer</Td>
        <Td>
        <Link to={`/student-dashboard/vote-page/${"Financial Secretary"}`}>
            <Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button>
        </Link>
        </Td>
        <Td>Pending</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>


      <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>SUG President</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Select placeholder='Select Candidate'>
                            <option value='option1'>Ahmed Umar Atiku</option>
                            <option value='option2'>Ridwan Suleiman Naibi</option>
                            <option value='option3'>Pascal Ally Ahmadu</option>
                            <option value='option3'>Hyefur Jonathan</option>
                        </Select>

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose}>
                        Vote
                    </Button>
                    <Button  colorScheme='red' onClick={onClose} >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>


    </div>;
}

export default StudentVote;