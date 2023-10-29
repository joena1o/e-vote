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
import {FaVoteYea} from 'react-icons/fa';

const StudentVote = () =>{

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isOpen, onOpen, onClose } = useDisclosure()

    return <div style={{
        display: "inline-flex",
        alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
    }}>

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
        <Td><Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button></Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Sports Director</Td>
        <Td><Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button></Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Director Of Social</Td>
        <Td><Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button></Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Financial Secretary</Td>
        <Td><Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button></Td>
        <Td>Pending</Td>
      </Tr>
      <Tr>
        <Td>Treasurer</Td>
        <Td><Button colorScheme='yellow' onClick={onOpen} variant='outline'><FaVoteYea /></Button></Td>
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