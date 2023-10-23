import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
Button,useDisclosure
} from '@chakra-ui/react'
import {Table,Thead,TabList,Tab,Tabs,Tbody,Tr,Th,Td,TableCaption,Stack,TableContainer} from '@chakra-ui/react';
import {FormControl,FormLabel} from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react';
import {AiFillEye} from 'react-icons/ai';

const buttonStyle = {
    padding: "10px",
    margin: "50px 40px"
};


function StudentNominate() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isOpen, onOpen, onClose } = useDisclosure()


    return <div style={{
        display: "inline-flex",
        alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
    }}>


    <Stack style={{width:"95%", margin:"50px 50px"}} spacing={4} direction='row' align='end'>
    <Button style={{buttonStyle}} colorScheme='yellow' variant='outline' onClick={onOpen}>Nominate Candidate</Button>
    </Stack>

    <Tabs>
        <TabList>
            <Tab>All</Tab>
            <Tab>General</Tab>
            <Tab>Departmental</Tab>
        </TabList>
    </Tabs>

    <br></br><br></br>


<TableContainer style={{width:"90%"}}>
  <Table variant='striped' size="lg">
    <TableCaption>Nominated candidates for the upcoming election</TableCaption>
    <Thead>
      <Tr style={{textAlign:"start"}}>
        <Th>Name</Th>
        <Th>Faculty</Th>
        <Th isNumeric>Department</Th>
        <Th isNumeric>Role</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Hyefur Jonathan</Td>
        <Td>Engineering</Td>
        <Td>Electrical/Electronics Engineering</Td>
        <Td>Sports Director</Td>
        <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
      </Tr>
      <Tr>
        <Td>Hyefur Jonathan</Td>
        <Td>Engineering</Td>
        <Td>Electrical/Electronics Engineering</Td>
        <Td>Sports Director</Td>
        <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
      </Tr>
      <Tr>
        <Td>Hyefur Jonathan</Td>
        <Td>Engineering</Td>
        <Td>Electrical/Electronics Engineering</Td>
        <Td>Sports Director</Td>
        <Td><Button colorScheme='yellow' variant='outline'><AiFillEye /></Button></Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>


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

export default StudentNominate;