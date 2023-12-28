import { Button} from '@chakra-ui/react'
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React from 'react';
import { HStack } from '@chakra-ui/react'
import {FormControl, FormLabel, FormHelperText} from '@chakra-ui/react'

          const ElectionApplication = ()=>{
                 
                 return <div style={{display: "inline-flex",
                 height: "85vh", overflowY:"scroll",
                 alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"}}>

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

                 <FormLabel>Upload Image</FormLabel>
                 <input type='file' /><br/><br/><br/>

               
                 <FormLabel>Student 1</FormLabel>
                 <Input type='email' /><br/><br/>

                 <FormLabel>Student 2</FormLabel>
                 <Input type='email' /><br/><br/>

                 <FormLabel>Level coordinator email address</FormLabel>
                 <Input type='email' /><br/><br/>


                 </FormControl><br/><br/>
                 


                 <Button colorScheme='yellow'>Submit</Button>

                 </div>

              </div>
}

export default ElectionApplication;