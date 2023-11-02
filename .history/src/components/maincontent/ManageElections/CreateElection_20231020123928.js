import React, { useState } from 'react';
import styled from 'styled-components';
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

const FormMultiSelect = styled.select`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  height: 100px;
  multiple: true;
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
  const [students] = useState([
    'john.doe@example.com',
    'jane.smith@example.com',
    // Add more students as required
  ]);

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
        <FormMultiSelect 
          id="electionType" 
          name="electionType" 
          onChange={e => setElectionType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="general">General</option>
          <option value="faculty">Faculty</option>
          <option value="department">Department</option>
        </FormMultiSelect>
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
        <FormLabel htmlFor="committeeEmail">Committee Members:</FormLabel>
        <FormMultiSelect id="committeeEmail" name="committeeEmail" multiple>
          {students.map(email => (
            <option key={email} value={email}>
              {email}
            </option>
          ))}
        </FormMultiSelect>
      </FormField>

      <SubmitButton>Create Election</SubmitButton>
    </Form>
  );
};

export default CreateElection;
