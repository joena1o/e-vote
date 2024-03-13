import React, {useState, useEffect} from 'react';
import { HStack, Stack, StackDivider } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Box, Heading, Text } from '@chakra-ui/react';
import { supabase } from '../../../supabase';
import { CircularProgress } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { notify, errorNotice } from '../../../util/toast';
import { filterArrayBasedOnValue } from '../../../util/filter';

const bodyStyle = { display: "inline-flex", alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"};



const StudentsProfile = () => {

const [loading, setLoadingStatus] = useState(false);
const [loadingAcceptance, setLoadingAcceptance] = useState({value: false, index: 0});

const jsonString = localStorage.getItem('user_auth');
var parsedData = JSON.parse(jsonString); 

   useEffect(() => {
    fetchDataFromSupabase();
   }, []);


  const fetchDataFromSupabase = async () => {
    setLoadingStatus(true);
    try {
      const { data, error } = await supabase.
      from('nominated_candidates')
      .select(`*`)
      .eq("candidate_id", parsedData.matriculation_number)
      .gt("nomination_number", 1);
      
      if (error) {
        throw error;
      }
      console.log(data);
      setLoadingStatus(false);
      setAllNominations(data);
    } catch (error) {
      setLoadingStatus(false);
      console.error('Error fetching data from Supabase:', error.message);
    }
  };


  const nominationAcceptance = async(payload,index)=>{
       setLoadingAcceptance(true);
       try{
          const { error } = await supabase.
          from('nominated_candidates')
          .update({
            status: payload
          })
          .eq("candidate_id", parsedData.matriculation_number);
          if (error) {
            throw error;
          }
          if(payload == "Accepted"){
            notify("Nomination Accepted, Please wait while in review")
          }else{
            notify("Nomination was declined successfully")
          }
          setLoadingAcceptance({value: false, index: index});
       }catch(error){
         setLoadingAcceptance({value: false, index: index}); 
         console.error('Error fetching data from Supabase:', error.message);
         errorNotice("An error occured when process your request")
       }         
  }


  const [ nominations, setAllNominations ] = useState([]);  

  return (
    <div style={bodyStyle}>

     <HStack spacing='24px' style={{ width: "90%", margin: "20px 0px 50px 0px" }}>

         <Breadcrumb>

            <BreadcrumbItem>
               <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
               <BreadcrumbLink href='#'>Profile</BreadcrumbLink>
            </BreadcrumbItem>

         </Breadcrumb>

      </HStack>

      <div style={{ width: "90%" }}>

       <p style={{marginBottom:"30px"}}>Nominations</p>          

      <Card>
      <CardBody>

      <Heading size='xs' textTransform='uppercase' color="brown">
        - Declined
      </Heading><br/><br/>

      {  
      !loading ?
         <Stack divider={<StackDivider />} spacing='4'>
         {          
           filterArrayBasedOnValue(nominations, "status", "Decline").map((nomination, index)=>(
            <Box>
                 <Heading size='xs' textTransform='uppercase'>
                 {nomination.position_id}
                 </Heading>
                 <Text>Nominations: {nomination.nomination_number}</Text>
            </Box>
         )) 
         } </Stack> : <CircularProgress isIndeterminate />
         
      }

      <br/>

      <br />
      
        <hr/><br/>  

      <Heading size='xs' textTransform='uppercase' color="brown">
        - Accepted
      </Heading><br/>
      {    !loading ?
         <Stack divider={<StackDivider />} spacing='4'>
         {         
           filterArrayBasedOnValue(nominations, "status", "Accepted").map((nomination, index)=>(
            <Box>
                 <Heading size='xs' textTransform='uppercase'>
                 {nomination.position_id}
                 </Heading>
                 <Text>Nominations: {nomination.nomination_number}</Text>
            </Box>
         ))
         } </Stack> : <CircularProgress isIndeterminate />
      } <br/>

        <br/>

        <hr/><br/>

        <Heading size='xs' textTransform='uppercase' color="brown">
          - Nominations
        </Heading><br/>

       {
         !loading ?
         <Stack divider={<StackDivider />} spacing='4'>
         {      
           filterArrayBasedOnValue(nominations, "status", "Pending").map((nomination, index)=>(
            <Box>
                 <Heading size='xs' textTransform='uppercase'>
                 {nomination.position_id}
                 </Heading>
                 <Text>Nominations: {nomination.nomination_number}</Text>
                 { 
                 !loadingAcceptance.value || loadingAcceptance.index == index  ? <ButtonGroup spacing='2' key={nomination.id} style={{marginTop:"20px"}}>
                  <Button variant='solid' colorScheme='blue' 
                  onClick={(e) => {
                    e.preventDefault();
                    nominationAcceptance("Accepted", index)
                  }}>
                   Accept 
                  </Button>
                  <Button variant='ghost' colorScheme='red' 
                   onClick={(e) => {
                                  e.preventDefault();
                                  nominationAcceptance("Decline", index)
                 }}>
                  Decline
                  </Button>
                 </ButtonGroup> : <CircularProgress isIndeterminate />
                 }
                 <br/>
            </Box>
         ))
        }
       </Stack> : <CircularProgress isIndeterminate />
      }          
     </CardBody>
     </Card>

   <ToastContainer />   

   </div>

    </div>
  )
}

export default StudentsProfile;