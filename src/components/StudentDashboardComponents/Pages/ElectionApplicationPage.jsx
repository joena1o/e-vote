import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure} from '@chakra-ui/react'
import { Table, Thead, TabList, Tab, Tabs, Tbody, Tr, Th, Td, TableCaption, TabPanel, TabPanels, Stack, TableContainer } from '@chakra-ui/react';
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbSeparator} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai'
import { Route, useParams, Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react'
import logo from '../../../assets/school_logo.jpg';
import {
                 FormControl,
                 FormLabel,
                 FormErrorMessage,
                 FormHelperText,
               } from '@chakra-ui/react'

const ElectionApplication = ()=>{
                 return <div style={{
                                  display: "inline-flex",
                                  alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
                              }}>


                 <HStack spacing='24px' style={{width:"90%", margin:"20px 0px 50px 0px"}}>

                 <Breadcrumb>

                 <BreadcrumbItem>
                 <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                 </BreadcrumbItem>

                 <BreadcrumbItem isCurrentPage>
                 <BreadcrumbLink href='#'>Nomination</BreadcrumbLink>
                 </BreadcrumbItem>

                 <BreadcrumbItem isCurrentPage>
                 <BreadcrumbLink href='#'>Application</BreadcrumbLink>
                 </BreadcrumbItem>

                 </Breadcrumb>

                 </HStack>


                 <div style={{width:"50%"}}>

                 <FormControl>
                 <FormLabel>Fullname</FormLabel>
                 <Input type='text' /><br/><br/>

                 <FormLabel>Level</FormLabel>
                 <Select placeholder='Select Level'>
                 <option>100</option>
                 <option>200</option>
                 <option>300</option>
                 <option>400</option>
                 <option>500</option>
                 </Select><br/><br/>

                 <FormLabel>Department</FormLabel>
                 <Input type='text' /><br/><br/>

                 <FormLabel>Upload Image</FormLabel>
                 <input type='file' /><br/><br/><br/>

                 
                 <FormLabel>Email address</FormLabel>
                 <Input type='email' />
                 <FormHelperText>We'll never share your email.</FormHelperText>
                 </FormControl><br/><br/>


                 <Button colorScheme='yellow'>Submit</Button>

                 </div>


                 


                  </div>
}

export default ElectionApplication;