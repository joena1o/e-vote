import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';

const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 3em;
  border-radius: 0;
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 2em auto;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  align-items: start;
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
`;

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState([]);

  const students = [
    { value: 'john.doe@example.com', label: 'John Doe' },
    { value: 'jane.smith@example.com', label: 'Jane Smith' },
    // Add more students as required
  ];

  
const electionTypeOptions = [
  { value: 'general', label: 'General' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'department', label: 'Department' }
];

return (
  <Form>
    <h2>Create Election</h2>
    
    <FormField>
      <FormLabel htmlFor="electionTitle">
        <FiType />
        Election Title:
      </FormLabel>
      <FormInput id="electionTitle" name="electionTitle" type="text" placeholder="Enter Election Title" />
    </FormField>

    <FormField>
      <FormLabel htmlFor="electionType">
        <FiFileText />
        Election Type:
      </FormLabel>
      <Select
          id="electionType"
          options={electionTypeOptions}
          onChange={(option) => setElectionType(option.value)}
          placeholder="Select Election Type"
      />
    </FormField>

    {(electionType === 'faculty' || electionType === 'department') && (
      <FormField>
        <FormLabel htmlFor="name">
          <FiClipboard />
          {electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:
        </FormLabel>
        <FormInput id="name" name="name" type="text" />
      </FormField>
    )}

    <FormField>
      <FormLabel htmlFor="position">
        <FiUsers />
        Position Contested For:
      </FormLabel>
      <FormInput id="position" name="position" type="text" />
    </FormField>

    <h3>Election Committee</h3>
    <FormField>
      <FormLabel>
        <FiUserCheck />
        Committee Members:
      </FormLabel>
      <Select 
        isMulti 
        options={students} 
        onChange={setSelectedCommittee}
        placeholder="Select committee members..."
      />
    </FormField>

    <SubmitButton>Create Election</SubmitButton>
  </Form>
);
};

export default CreateElection;
