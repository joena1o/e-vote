import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';
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

const { colorMode } = useColorMode();

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

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState([]);

  const students = [
    { value: 'john.doe@example.com', label: 'John Doe' },
    { value: 'jane.smith@example.com', label: 'Jane Smith' },
  ];

  const electionTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' }
  ];

  return (
    
      <Form>
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

        <SubmitButton>Create Election</SubmitButton>
      </Form>
    
  );
};

export default CreateElection;