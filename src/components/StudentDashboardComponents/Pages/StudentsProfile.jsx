import React, {useState, useEffect} from 'react';
import { HStack, Stack, StackDivider } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { FormLabel, Input } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Text, Box, Heading } from '@chakra-ui/react';
import { supabase } from '../../../supabase';
import { CircularProgress } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { notify } from '../../../util/toast';

const bodyStyle = { display: "inline-flex", alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"};

const StudentsProfile = () => {

   const [loading, setLoadingStatus] = useState(false);
   const [loadingAcceptance, setLoadingAcceptance] = useState(false);

   useEffect(() => {
    fetchDataFromSupabase();
    fetchPositions();
    fetchCandidates();
  }, []);


  const fetchPositions = async () => {
                 setLoadingStatus(true);
                 try {
                   const { data, error } = await supabase.from('positions').select(`*`);
                   if (error) {
                     throw error;
                   }
                   setLoadingStatus(false);
                   console.log(data);
                   setAllPositions(data);
   } catch (error) {
                 setLoadingStatus(false);
                 console.error('Error fetching data from Supabase:', error.message);
   }
};

const fetchCandidates = async () => {
                 setLoadingStatus(true);
                 try {
                   const { data, error } = await supabase.from('nominated_candidates').select(`*`);
                   if (error) {
                     throw error;
                   }
                   setLoadingStatus(false);
                   console.log(data);
                   setAllCandidates(data);
   } catch (error) {
                 setLoadingStatus(false);
                 console.error('Error fetching data from Supabase:', error.message);
   }
};
             
const [ allPositions, setAllPositions ] = useState([]);

const [ allCandidates, setAllCandidates ] = useState([]);


  const fetchDataFromSupabase = async () => {
    setLoadingStatus(true);
    try {
      const { data, error } = await supabase.from('nominee').select(`*`).eq("nominee_id", "EEE/17U/0772");
      if (error) {
        throw error;
      }
      console.log(data);
      setLoadingStatus(false);
      const newData = data.filter(item => item.nominee_id === "EEE/17U/0772");
      setAllNominations(newData);
    } catch (error) {
      setLoadingStatus(false);
      console.error('Error fetching data from Supabase:', error.message);
    }
  };

  const [ nominations, setAllNominations ] = useState([]);  



  const acceptNomination = async(nominee_id, position)=>{
                 setLoadingAcceptance(true);
                 try{
                 const {result, error} = await supabase.from("nominated_candidates").insert([{
                 "candidate_id": nominee_id,
                 "position": position,
                 "status": "Awaiting Approval"
                 }]);
                 if (error) {
                 throw new Error(error.message);
                 }
                 setLoadingAcceptance(false);
                 notify("Accepted");
                 return;
                 }catch(error){
                 setLoadingAcceptance(false);
                 console.error('Error fetching data from Supabase:', error.message);
                 }
}

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
       {
                 !loading ?
                 
                 nominations.length == 0 ? <Text>Empty</Text> : 
                 <Stack divider={<StackDivider />} spacing='4'>
                 {
                 
                 nominations.map((nomination)=>(
                 
                 <Box>

                 <Heading size='xs' textTransform='uppercase'>
                      {
                         allPositions.length > 0 ? allPositions.find(obj => obj.id == nomination.position_id).name : "" 
                      }
                 </Heading>

                 <br />
                 <FormLabel>Level coordinator email address</FormLabel>
                 <Input type='email' name="coordinators_email" /><br />

                 { 
                 !loadingAcceptance ? <ButtonGroup spacing='2' style={{marginTop:"20px"}}>
                  <Button variant='solid' colorScheme='blue' 
                  onClick={(e) => {
                                  e.preventDefault();
                                  acceptNomination(nomination.nominee_id, allPositions.length > 0 ? allPositions.find(obj => obj.id == nomination.position_id).name : "" )
                                }}>
                   Accept 
                  </Button>
                  <Button variant='ghost' colorScheme='red'>
                  Decline
                  </Button>
                 </ButtonGroup> : <CircularProgress isIndeterminate />
                 }
                 </Box>

                 )
                 
                 )
                 
                 }
                 </Stack>
                 : <CircularProgress isIndeterminate />
       }          
      </CardBody>
      </Card>


      <ToastContainer />

      </div>

    </div>
  )
}

export default StudentsProfile;