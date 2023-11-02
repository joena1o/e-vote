import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure} from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TabPanel, TabPanels, Stack, TableContainer } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbSeparator} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai'
import { Route, useParams, Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react'
import logo from '../../../assets/school_logo.jpg';


function NomineesPage(){

                 const { data } = useParams();
                 const [open, setOpen] = useState(false);
                 const handleOpen = () => setOpen(true);
                 const handleClose = () => setOpen(false);
                 const { isOpen, onOpen, onClose } = useDisclosure()
                 

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
                 <BreadcrumbLink href='#'>Nomination</BreadcrumbLink>
                 </BreadcrumbItem>

                 <BreadcrumbItem isCurrentPage>
                 <BreadcrumbLink href='#'>Election</BreadcrumbLink>
                 </BreadcrumbItem>

                 <BreadcrumbItem isCurrentPage>
                 <BreadcrumbLink href='#'>{data}</BreadcrumbLink>
                 </BreadcrumbItem>

                 </Breadcrumb>

                 </HStack>


                 <Tabs style={{width:"90%"}}>

                 <TabList>
                 <Tab>All</Tab>
                 <Tab>Pending</Tab>
                 <Tab>Qualified</Tab>
                 <Tab>Disqualified</Tab>
                 </TabList>

                 <TabPanels>

                 <TabPanel>

                 <TableContainer style={{width:"100%"}}>
                 <Table variant='striped' size="lg">
                 <TableCaption>Applied Candidates</TableCaption>
                 <Thead>
                 <Tr style={{textAlign:"start"}}>
                 <Th>Full-name</Th>
                 <Th isNumeric>Department</Th>
                 <Th isNumeric>Display Picture</Th>
                 {/* <Th>Action</Th> */}
                 <Th>Status</Th>
                 </Tr>
                 </Thead>
                 <Tbody>
                 <Tr>
                 <Td>Ahmed Umar Atiku</Td>
                 <Td>Computer Science</Td>
                 <Td><img src={logo} width="10%" /></Td>
                 {/* <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td> */}
                 <Td>Pending</Td>
                 </Tr>
                 <Tr>
                 <Td>Pascal Ally Ahmadu</Td>
                 <Td>Computer Science</Td>
                 <Td><img src={logo} width="10%" /></Td>
                 {/* <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td> */}
                 <Td>Pending</Td>
                 </Tr>
                 <Tr>
                 <Td>Hyefur Jonathan</Td>
                 <Td>Electrical/Electronics Engineering</Td>
                 <Td><img src={logo} width="10%" /></Td>
                 {/* <Td><Link to="/student-dashboard/election-page"><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td> */}
                 <Td>Pending</Td>
                 </Tr>
                 </Tbody>
                 </Table>
                 </TableContainer>
                                  
                 </TabPanel>

                 </TabPanels>

                 </Tabs> 

                 


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

export default NomineesPage;;