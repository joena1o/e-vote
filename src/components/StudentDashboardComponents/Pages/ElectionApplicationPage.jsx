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
import { notify, errorNotice } from '../../../util/toast';





const ElectionApplication = () => {

   const [loading, setLoadingStatus] = useState(false);
   const {electionId, positionId} = useParams();

   const jsonString = localStorage.getItem('user_auth');
   var parsedData = JSON.parse(jsonString); 
   // console.log(parsedData);

    const validationSchema = Yup.object().shape({
      election_id: Yup.string().required('Election Id is required'),
      nominee_id: Yup.string().required('Nominee Id is required'),
      nominated_by: Yup.string().required('User is required to be nominated'),
      position_id: Yup.string().required('Positioned Id is required'),
    });

    const formik = useFormik({
      initialValues: {
            election_id: electionId,
            nominee_id: "",
            nominated_by: parsedData.matriculation_number,
            position_id: positionId,
      },
       validationSchema,
       onSubmit: async (values)=>{
         setLoadingStatus(true);
         try{

               const student = await supabase
               .from("students")
               .select(`*`)
               .eq("matriculation_number", values.nominee_id)
               .gt("cgpa", "2.0");

               // 300/400 Level and 2.5 gpa for post of president and vice president

               if(student.data.length == 0){
                  errorNotice("This candidate is not eligible");
                  setLoadingStatus(false);
                  return;
               }

               const {data, error} = await supabase
               .from("nominee")
               .select(`*`)
               .eq("nominee_id", values.nominee_id)
               .eq("nominated_by", values.nominated_by)
               .eq("election_id", electionId);

               if(error){
                  errorNotice("An error occurred while nominating student");
                  setLoadingStatus(false);
                  return;
               }

               if(data.length > 0){

                  errorNotice("You cannot nominate a particular candidate more than once");
                  setLoadingStatus(false);

               }else{

                  const {error} = await supabase.
                  from("nominee")
                  .insert([values]);
                  if (error) {
                     throw new Error(error.message);
                  }

                  const nominated_candidate = await supabase
                  .from("nominated_candidates")
                  .select('*')
                  .eq('candidate_id', values.nominee_id)
                  .eq("position_id", positionId)
                  .eq("election_id", electionId)


                  if(nominated_candidate.data.length > 0){

                     var currentNumber = nominated_candidate.data[0].nomination_number + 1;

                     const nominated_candidate_into_db = await supabase
                     .from("nominated_candidates")
                     .update({nomination_number: currentNumber})
                     .eq('candidate_id', values.nominee_id)
                     .eq("position_id", positionId)
                     .eq("election_id", electionId)

                     setLoadingStatus(false);
                     notify("Nominated Successfully");
                     return;

                  }else{

                     const nominated = await supabase.from("nominated_candidates")
                     .insert([{
                        "candidate_id": values.nominee_id,
                        "position_id": positionId,
                        "election_id": electionId,
                     }]);

                     if (nominated.error) {
                        setLoadingStatus(false);
                        throw new Error(nominated.error.message);
                     }
                        setLoadingStatus(false);
                        notify("Nominated Successfully");
                        return;

                    
                  }
                 

               }

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
               <BreadcrumbLink href='#'>Application - {positionId} </BreadcrumbLink>
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