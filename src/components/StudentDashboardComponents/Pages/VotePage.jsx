import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react';
import { HStack, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { Image } from '@chakra-ui/react'
import { Popover, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { toast } from 'react-toastify';
import { Grid, GridItem } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css';


const candidates = [
   {
      name: "Pascal Ally Ahmadu",
      department: "Computer Science",
      val: "2"
   },
   {
      name: "Ahmed Umar Atiku",
      department: "Computer Science",
      val: "3"
   },
   {
      name: "Ridwan Suleiman Naibi",
      department: "Computer Science",
      val: "4"
   },
   {
      name: "Hyefur Jonathan",
      department: "Electrical / Electronics Engineering",
      val: "1"
   },

];



const VotePage = () => {

   const { data } = useParams();
   const [value, setValue] = useState('')
   const [selectedCandidate, setCandidate] = useState("");


   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const { isOpen, onOpen, onClose } = useDisclosure();

   return <div style={{ display: "inline-flex", alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px" }}>


      <HStack spacing='24px' style={{ width: "90%", margin: "10px 0px 10px 0px" }}>

         <Breadcrumb>

            <BreadcrumbItem>
               <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
               <BreadcrumbLink href='#'>Vote</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
               <BreadcrumbLink href='#'>{data}</BreadcrumbLink>
            </BreadcrumbItem>

         </Breadcrumb>

      </HStack>


      <p>Select desired Candidate</p>

      <div style={{ width: "90%", marginTop: "10px", display: "inline-flex", justifyContent: "center" }}>

         <Popover>

            <center>

               <PopoverContent style={{
                  width: "55vw", height: "50vh",
                  overflowY: "scroll",
                  padding: "20px 0px", alignItems: "center", marginTop: "20px"
               }}>

                  <PopoverArrow />

                  <PopoverCloseButton />

                  <PopoverBody>

                  </PopoverBody>
               </PopoverContent>
            </center>
         </Popover>

      </div>

      {

         (value == '') ? <></> : <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden' style={{
               display: "inline-flex",
               padding: "20px 0px", marginTop: "20px",
               border: "1px solid transparent",
               justifyContent: "center", width: "40vw"
            }}
            variant='outline'>
            <Image
               objectFit='cover'
               // maxW={{ base: '100%', sm: '200px' }}
               boxSize="100px"
               src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
               alt='Caffe Latte'
            />

            <Stack>

               <CardBody >
                  <Heading size='md'>
                     {candidates.find(item => item['val'] === value).name}
                  </Heading>

                  <Text py='2' style={{ textAlign: "start" }}>
                     {candidates.find(item => item['val'] === value).department}
                  </Text>

               </CardBody>


            </Stack>
         </Card>

      }


      <CheckboxGroup onChange={setValue} value={value}>

         <Grid templateColumns='repeat(2, minmax(30vw, 2fr))' gap={7} >

            {

               candidates.map((val) =>

                  <GridItem rowSpan={2} colSpan={1} >

                     <Checkbox value={val.val}>



                        <Card
                           direction={{ base: 'column', sm: 'row' }}
                           overflow='hidden' style={{
                              display: "inline-flex",
                              padding: "20px 0px", marginTop: "10px", width: "30vw",
                              // border:"1px solid transparent",
                              justifyContent: "center"
                           }}
                           variant='outline'>

                           <Image
                              objectFit='cover'
                              boxSize="100px"
                              src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                              alt='Caffe Latte'
                           />

                           <Stack>

                              <CardBody>
                                 <Heading size='md'>{val.name}</Heading>

                                 <Text py='2' style={{ textAlign: "start" }}>
                                    {val.department}
                                 </Text>

                              </CardBody>

                           </Stack>
                        </Card>



                     </Checkbox>

                  </GridItem>

               )}

         </Grid>
      </CheckboxGroup>



      <Button style={{ marginTop: "30px" }} onClick={onOpen} colorScheme='green'>Vote</Button>



      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>{data}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               Are you sure you have made your decision?
            </ModalBody>

            <ModalFooter>
               <Button colorScheme='green' mr={3} onClick={() => {
                  toast.success('Election created successfully!');
               }}>
                  Yes
               </Button>
               <Button colorScheme='red' onClick={onClose} >No</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>



   </div>;
}

export default VotePage;