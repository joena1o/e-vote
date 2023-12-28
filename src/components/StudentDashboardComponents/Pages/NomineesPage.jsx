import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure} from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TabPanel, TabPanels, TableContainer, Textarea } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink} from '@chakra-ui/react'
import React, { useState } from 'react';
import { HStack} from '@chakra-ui/react'
import {useParams } from 'react-router-dom';
import logo from '../../../assets/school_logo.jpg';
import { LuPen } from "react-icons/lu";
import { Select } from '@chakra-ui/react'


function NomineesPage(){

                 const { data } = useParams();
                 const [open, setOpen] = useState(false);
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

                    <div style={{display:"inline-flex", justifyContent:"flex-end", width:"100%", 
                        alignItems:"center", margin:"20px"}}>
                     Submit Petition    
                    <Button colorScheme='yellow' 
                    style={{marginLeft:"20px"}}
                    onClick={onOpen} variant='outline'><LuPen /></Button>  
                    </div>

                 

                 <TableContainer style={{width:"100%"}}>
                    <Table variant='striped' size="lg">
                        <TableCaption>Applied Candidates</TableCaption>
                        <Thead>
                        <Tr style={{textAlign:"start"}}>
                        <Th>Full-name</Th>
                        <Th isNumeric>Department</Th>
                        <Th isNumeric>Display Picture</Th>
                        {/* <Th>Petition</Th> */}
                        <Th>Status</Th>
                        </Tr>
                        </Thead>
                    <Tbody>
                    <Tr>
                        <Td>Ahmed Umar Atiku</Td>
                        <Td>Computer Science</Td>
                        <Td><img src={logo} width="10%" /></Td>
                        <Td>Pending</Td>
                    </Tr>
                    <Tr>
                        <Td>Pascal Ally Ahmadu</Td>
                        <Td>Computer Science</Td>
                        <Td><img src={logo} width="10%" /></Td>
                        <Td>Pending</Td>
                    </Tr>
                    <Tr>
                        <Td>Hyefur Jonathan</Td>
                        <Td>Electrical/Electronics Engineering</Td>
                        <Td><img src={logo} width="10%" /></Td>
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
                 <ModalHeader>Petition</ModalHeader>
                 <ModalCloseButton />
                 <ModalBody>
                    <FormControl>

                    <FormLabel>Select Candidate</FormLabel>
                    <Select placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    </Select><br/>

                        <FormLabel>Note</FormLabel>
                        <Textarea placeholder='Type message here....' /><br/><br/>

                        <FormLabel>Evidence</FormLabel>
                        <input type="file" />
                    
                    </FormControl>
                </ModalBody>

                 <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose}>
                        Submit
                    </Button>
                    <Button variant='red'>Cancel</Button>
                 </ModalFooter>
                 </ModalContent>
                 </Modal>

                 </div>;
}

export default NomineesPage;;