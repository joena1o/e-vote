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
  background: rgba(255, 255, 255, 0.3);
  padding: 3em;
  border-radius: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: #fff;
  font-size: 1.4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormInput = styled.input`
  flex-grow: 1;
  padding: 1em;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #fff;
  transition: all 0.2s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  &:focus {
    border-bottom: 1px solid #fff;
    outline: none;
  }
`;

const CreateButton = styled.button`
  padding: 0.5rem 2rem;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }
`;

const CreateElection = () => {
  return (
    <Form>
      <FormField>
        <FiFileText />
        <FormLabel htmlFor="name">Election Name:</FormLabel>
        <FormInput id="name" name="name" type="text" placeholder="Election Name" />
      </FormField>

      <FormField>
        <FiUsers />
        <FormLabel htmlFor="type">Election Type:</FormLabel>
        <FormInput as="select" id="type" name="type">
          <option value="">Select type</option>
          <option value="general">General</option>
          <option value="faculty">Faculty</option>
          <option value="department">Department</option>
        </FormInput>
      </FormField>

      <FormField>
        <FiCalendar />
        <FormLabel htmlFor="date">Election Date:</FormLabel>
        <FormInput id="date" name="date" type="date" />
      </FormField>

      <FormField>
        <FiBookOpen />
        <FormLabel htmlFor="faculty">Faculty Name:</FormLabel>
        <FormInput id="faculty" name="faculty" type="text" placeholder="Faculty Name" />
      </FormField>

      <FormField>
        <FiUserCheck />
        <FormLabel htmlFor="department">Department Name:</FormLabel>
        <FormInput id="department" name="department" type="text" placeholder="Department Name" />
      </FormField>

      <CreateButton>Create Election</CreateButton>
    </Form>
  );
};

export default CreateElection;
