import React from 'react';
import styled from 'styled-components';
import {
  FiCalendar,
  FiUsers,
  FiFileText,
  FiBookOpen,
  FiUserCheck,
  FiUserPlus,
  FiPlusCircle,
} from 'react-icons/fi';

const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 3em;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0,0,0,0.2);
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-right: 1rem;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #ce7348, #9a552e);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(to right, #9a552e, #ce7348);
  }
`;

const CreateElection = () => {
  return (
    <Form>
      <h2>Create Election</h2>

      <FormField>
        <FiFileText />
        <FormLabel htmlFor="name">Election Name:</FormLabel>
        <FormInput id="name" name="name" type="text" placeholder="Election Name" />
      </FormField>

      <FormField>
        <FiUsers />
        <FormLabel htmlFor="type">Election Type:</FormLabel>
        <FormInput id="type" name="type" type="text" placeholder="Election Type" />
      </FormField>

      <FormField>
        <FiCalendar />
        <FormLabel htmlFor="date">Election Date:</FormLabel>
        <FormInput id="date" name="date" type="date" />
      </FormField>

      <h3>Election Committee</h3>

      <FormField>
        <FiUserPlus />
        <FormLabel htmlFor="committeeName">Committee Member Name:</FormLabel>
        <FormInput id="committeeName" name="committeeName" type="text" placeholder="Member Name" />
      </FormField>

      <FormField>
        <FiUserCheck />
        <FormLabel htmlFor="committeeEmail">Committee Member Email:</FormLabel>
        <FormInput id="committeeEmail" name="committeeEmail" type="email" placeholder="Member Email" />
      </FormField>

      <FormField>
        <FiBookOpen />
        <FormLabel htmlFor="committeePosition">Committee Member Position:</FormLabel>
        <FormInput id="committeePosition" name="committeePosition" type="text" placeholder="Position" />
      </FormField>

      {/* You can add a button here to dynamically add more fields for additional committee members. */}

      <CreateButton>Create Election</CreateButton>
    </Form>
  );
};

export default CreateElection;
