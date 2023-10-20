import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType, FiX } from 'react-icons/fi';
import { useColorMode } from '@chakra-ui/react';


const selectStyles = theme => ({
  menu: base => ({
    ...base,
    backgroundColor: theme === 'dark' ? '#2c2c2c' : '#ffffff',
  }),


  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? theme === 'dark' ? '#3c3c3c' : '#e2e2e2'
      : theme === 'dark' ? '#2c2c2c' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  control: base => ({
    ...base,
    backgroundColor: theme === 'dark' ? '#3c3c3c' : '#ffffff',
    borderColor: theme === 'dark' ? '#555555' : '#ccc',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  singleValue: base => ({
    ...base,
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  placeholder: base => ({
    ...base,
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
});


const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 2em;  // Reduced from 3em
  border-radius: 0;
  backdrop-filter: blur(10px);
  max-width: 600px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;  // Reduced from 1em
  align-items: start;
  width: 100%;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ce7348;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HalfWidthField = styled(FormField)`
  width: 48%;  // slightly less than half to account for any potential margins or paddings
`;
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%; // Smaller width for responsiveness
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
`;

const CloseIcon = styled(FiX)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ce7348;
`;

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const { colorMode } = useColorMode();

  const students = [
    { value: 'john.doe@example.com', label: 'John Doe' },
    { value: 'jane.smith@example.com', label: 'Jane Smith' },
  ];

  const electionTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' }
  ];

  const formik = useFormik({
    initialValues: {
      electionTitle: '',
      electionType: '',
      name: '',
      startDate: '',
      position: '',
      committeeMembers: [],
    },
    validationSchema: Yup.object({
      electionTitle: Yup.string().required('Required'),
      electionType: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      position: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // TODO: Your logic to add the election using AWS Amplify or other methods
      // For demonstration, I'll just show the modal
      setModalIsOpen(true);
    },
  });

  return (

    <>
  
      <Form onSubmit={formik.handleSubmit}>
        <h2>Create Election</h2>

        <Row>
          <HalfWidthField>
            <FormLabel htmlFor="electionTitle">
              <FiType />
              Title:
            </FormLabel>
            <FormInput id="electionTitle" name="electionTitle" type="text" placeholder="Enter Election Title" />
          </HalfWidthField>
          <HalfWidthField>
            <FormLabel htmlFor="electionType">
              <FiFileText />
              Type:
            </FormLabel>
            <Select
              id="electionType"
              options={electionTypeOptions}
              onChange={(option) => setElectionType(option.value)}
              placeholder="Select Type"
              styles={selectStyles(colorMode)}
            />
          </HalfWidthField>
        </Row>

        {(electionType === 'faculty' || electionType === 'department') && (
          <FormField>
            <FormLabel htmlFor="name">
              <FiClipboard />
              {electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:
            </FormLabel>
            <FormInput id="name" name="name" type="text" />
          </FormField>
        )}

        <Row>
          <HalfWidthField>
            <FormLabel htmlFor="startDate">
              <FiCalendar />
              Start Date:
            </FormLabel>
            <FormInput id="startDate" name="startDate" type="date" />
          </HalfWidthField>
          <HalfWidthField>
            <FormLabel htmlFor="position">
              <FiUsers />
              Position:
            </FormLabel>
            <FormInput id="position" name="position" type="text" placeholder="Enter Position" />
          </HalfWidthField>
        </Row>
        <FormField>
          <FormLabel>
            <FiUserCheck />
            Committee Members:
          </FormLabel>
          <Select 
            isMulti 
            options={students} 
            onChange={setSelectedCommittee}
            placeholder="Select members..."
            styles={selectStyles(colorMode)}
          />
        </FormField>

        <SubmitButton type="submit">Create Election</SubmitButton>
      </Form>
      
      <StyledModal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
    >
      <CloseIcon onClick={() => setModalIsOpen(false)} />
      <h2>Confirmation</h2>
      <p>Election has been added successfully!</p>
    </StyledModal>
  </>

    
  );
};

export default CreateElection;