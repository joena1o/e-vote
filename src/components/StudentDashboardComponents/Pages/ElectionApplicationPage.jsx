import { Button } from '@chakra-ui/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, {useState} from 'react';
import { HStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react';
import { supabase } from '../../../supabase';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CircularProgress } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../../util/toast';


const ElectionApplication = () => {

   const [loading, setLoadingStatus] = useState(false);

   const {electionId, positionId} = useParams();

    const validationSchema = Yup.object().shape({
      election_id: Yup.string().required('Election Id is required'),
      nominee_id: Yup.string().required('Nominee Id is required'),
      nominated_by: Yup.string().required('User is required to be nominated'),
      position_id: Yup.string().required('Positioned Id is required'),
      coordinators_email: Yup.string().required('Coordinators email is required'),
    });

    const formik = useFormik({
      initialValues: {
         election_id: electionId,
         nominee_id: "",
         nominated_by: "EEE/17U/0772",
         position_id: positionId,
         coordinators_email: ""
     },
       validationSchema,
       onSubmit: async (values)=>{
         setLoadingStatus(true);
         try{
               const {result, error} = await supabase.from("nominee").insert([values]);
               if (error) {
                  throw new Error(error.message);
               }
               setLoadingStatus(false);
               notify("Nominated Successfully");
               return;
            }catch(error){
               setLoadingStatus(false);
               console.error('Error fetching data from Supabase:', error.message);
            }
       }
    });

    const {
      handleChange,
      handleBlur,
      handleSubmit,
    } = formik;

   return <div style={{
      display: "inline-flex",
      height: "85vh", overflowY: "scroll",
      alignItems: "center", flexDirection: "column", width: "100%", marginTop: "20px"
   }}>

      <HStack spacing='24px' style={{ width: "90%", margin: "20px 0px 50px 0px" }}>

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


      <div style={{ width: "50%" }}>

         <FormControl>

            <FormLabel>Student ID</FormLabel>
            <Input type='text' name="nominee_id" onChange={handleChange}
                    onBlur={handleBlur} /><br /><br />


         </FormControl><br /><br />



         { !loading ? <Button onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }} colorScheme='yellow'>Submit</Button> : <CircularProgress isIndeterminate />
                
         }

      <ToastContainer />

      </div>

   </div>
}

export default ElectionApplication;