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
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 1rem);
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
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(to right, #9a552e, #ce7348);
  }
`;

const validationSchema = Yup.object({
  name: Yup.string().required('Election name is required'),
  type: Yup.string().oneOf(['general', 'faculty', 'department'], 'Invalid election type').required('Election type is required'),
  date: Yup.date().required('Election date is required').nullable(),
  faculty: Yup.string().when('type', {
    is: 'faculty',
    then: Yup.string().required('Faculty name is required for faculty elections'),
  }),
  department: Yup.string().when('type', {
    is: 'department',
    then: Yup.string().required('Department name is required for department elections'),
  }),
  committee: Yup.string().required('Election committee is required'),
  positions: Yup.string().required('Positions contested for is required'),
});

const CreateElection = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      date: null,
      faculty: '',
      department: '',
      committee: '',
      positions: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createElection(values));
      toast.success('Election created successfully!');
      resetForm();
    },
  });

  return (
    <FormContainer>
      <h2>Create Election</h2>
      <Form onSubmit={formik.handleSubmit}>
        {/* Other form fields... */}
        
        <FormField>
          <FormLabel htmlFor="committee">Election Committee:</FormLabel>
          <FormInput
            id="committee"
            name="committee"
            type="text"
            placeholder="Enter committee members separated by commas"
            onChange={formik.handleChange}
            value={formik.values.committee}
          />
          {formik.errors.committee && <FormError>{formik.errors.committee}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="positions">Positions Contested For:</FormLabel>
          <FormInput
            id="positions"
            name="positions"
            type="text"
            placeholder="Enter positions separated by commas"
            onChange={formik.handleChange}
            value={formik.values.positions}
          />
          {formik.errors.positions && <FormError>{formik.errors.positions}</FormError>}
        </FormField>

        <CreateButton type="submit">Create Election</CreateButton>
      </Form>
    </FormContainer>
  );
};

export default CreateElection;
