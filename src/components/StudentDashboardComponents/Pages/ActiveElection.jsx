
import { Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,useDisclosure} from '@chakra-ui/react'
import {Table,Thead,TabList,Tab,Tabs,Tbody,Tr,Th,Td,TableCaption,TabPanel, TabPanels, HStack, TableContainer} from '@chakra-ui/react';
import {FormControl,FormLabel} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import {AiFillEye} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { supabase } from '../../../supabase';

export const ActiveElection = () => {

    const [open, setOpen] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      fetchDataFromSupabase();
    }, []);
  
    const fetchDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase.from('elections').select('*');
        if (error) {
          throw error;
        }
        console.log(data);
        setAllElections(data);
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };

    const [ allElections, setAllElections ] = useState([]);

  return (
           <div style={{display: "inline-flex",alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"}}>
                          
                                <HStack spacing='24px' style={{width:"90%", margin:"50px 0px 50px 0px"}}>
                          
                                    <Breadcrumb>
                          
                                    <BreadcrumbItem>
                                      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                          
                                    <BreadcrumbItem isCurrentPage>
                                      <BreadcrumbLink href='#'>Election</BreadcrumbLink>
                                    </BreadcrumbItem>
                          
                                    </Breadcrumb>
                          
                                </HStack>
                          
                          
                              <Tabs style={{width:"90%"}}>
                                  <TabList>
                                      <Tab>All</Tab>
                                      <Tab>General</Tab>
                                      <Tab>Departmental</Tab>
                                  </TabList>
                          
                                  <TabPanels>
                          
                                  <TabPanel>
                                  <TableContainer style={{width:"100%"}}>
                                    <Table variant='striped' size="lg">
                                      <TableCaption>Available Elections</TableCaption>
                                      <Thead>
                                        <Tr style={{textAlign:"start"}}>
                                          <Th>All Elections</Th>
                                          <Th isNumeric>Session</Th>
                                          <Th>Action</Th>
                                          <Th>Status</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        <Tr>
                                              <Td>SUG Election 2023</Td>
                                              <Td>2021/2022</Td>
                                              <Td><Link to="/student-dashboard/vote"><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td>
                                              <Td>Active</Td>
                                        </Tr>        
                                      </Tbody>
                                    </Table>
                                  </TableContainer>
                                  </TabPanel>
                          
                                  <TabPanel>
                                  <TableContainer style={{width:"100%"}}>
                                    <Table variant='striped' size="lg">
                                      <TableCaption>Available Elections</TableCaption>
                                      <Thead>
                                        <Tr style={{textAlign:"start"}}>
                                          <Th>General Elections</Th>
                                          <Th isNumeric>Session</Th>
                                          <Th>Action</Th>
                                          <Th>Status</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        <Tr>
                                          <Td>SUG Election 2023</Td>
                                          <Td>2021/2022</Td>
                                          <Td><Link to="/student-dashboard/vote"><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td>
                                          <Td>Active</Td>
                                        </Tr>
                                      </Tbody>
                                    </Table>
                                  </TableContainer>
                                  </TabPanel>
                          
                                  <TabPanel>
                                  <TableContainer style={{width:"100%"}}>
                                    <Table variant='striped' size="lg">
                                      <TableCaption>Available Elections</TableCaption>
                                      <Thead>
                                        <Tr style={{textAlign:"start"}}>
                                          <Th>Department Election</Th>
                                          <Th isNumeric>Session</Th>
                                          <Th>Action</Th>
                                          <Th>Status</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                      <Tr>
                                          <Td>SUG Election 2023</Td>
                                          <Td>2021/2022</Td>
                                          <Td><Link to="/student-dashboard/vote"><Button colorScheme='yellow'  variant='outline'><AiFillEye /></Button></Link></Td>
                                          <Td>Action</Td>
                                        </Tr>
                                      </Tbody>
                                    </Table>
                                  </TableContainer>
                                  </TabPanel>
                          
                                  </TabPanels>
                          
                              </Tabs>
                          
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
                          
                              </div>
  )
}
