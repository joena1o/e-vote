import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createElection } from '../../../Redux/electionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const FormSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const FormError = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const CreateButton = styled.button`
  padding: 0.5rem;
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

const validationSchema = Yup.object({
  // ... (existing validation rules)
});

const CreateElection = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    // ... (existing formik configuration)
  });

  return (
    <FormContainer>
      <h2>Create Election</h2>
      <Form onSubmit={formik.handleSubmit}>
        {/* ... (existing form fields) */}
        
        <CreateButton type="submit">Create Election</CreateButton>
      </Form>
    </FormContainer>
  );
};

export default CreateElection;
