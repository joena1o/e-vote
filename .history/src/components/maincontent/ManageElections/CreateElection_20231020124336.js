import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';

const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 3em;
  border-radius: 0;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const FormInput = styled.input`
  flex-grow: 1;
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
`;

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState([]);

  const students = [
    { value: 'john.doe@example.com', label: 'John Doe' },
    { value: 'jane.smith@example.com', label: 'Jane Smith' },
    // Add more students as required
  ];

  return (
    <Form>
      <h2>Create Election</h2>
      
      <FormField>
        <FiType />
        <FormLabel htmlFor="electionTitle">Election Title:</FormLabel>
        <FormInput id="electionTitle" name="electionTitle" type="text" placeholder="Enter Election Title" />
      </FormField>

      <FormField>
        <FiFileText />
        <FormLabel htmlFor="electionType">Election Type:</FormLabel>
        <FormInput id="electionType" name="electionType" type="text" />
      </FormField>

      {(electionType === 'faculty' || electionType === 'department') && (
        <FormField>
          <FiClipboard />
          <FormLabel htmlFor="name">{electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:</FormLabel>
          <FormInput id="name" name="name" type="text" />
        </FormField>
      )}

      <FormField>
        <FiUsers />
        <FormLabel htmlFor="position">Position Contested For:</FormLabel>
        <FormInput id="position" name="position" type="text" />
      </FormField>

      <h3>Election Committee</h3>
      <FormField>
        <FiUserCheck />
        <FormLabel>Committee Members:</FormLabel>
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
