import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createElection } from '../../../Redux/electionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'; // Import styled-components

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
});

const FormContainer = styled.div`
  width: 100%; // Expand to the full width of the container
  max-width: 400px; // Limit the width to prevent it from expanding too much
  margin: 0 auto; // Center the form horizontally
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormError = styled.div`
  color: red;
  font-size: 0.8rem;
`;

const CreateElection = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      date: null,
      faculty: '',
      department: '',
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
      <form onSubmit={formik.handleSubmit}>
        <FormField>
          <FormLabel htmlFor="name">Election Name:</FormLabel>
          <FormInput
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <FormError>{formik.errors.name}</FormError>}
        </FormField>

        <FormField>
          <FormLabel htmlFor="type">Election Type:</FormLabel>
          <FormSelect
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="" label="Select type" />
            <option value="general" label="General" />
            <option value="faculty" label="Faculty" />
            <option value="department" label="Department" />
          </FormSelect>
          {formik.errors.type && <FormError>{formik.errors.type}</FormError>}
        </FormField>

        {formik.values.type === 'faculty' && (
          <FormField>
            <FormLabel htmlFor="faculty">Faculty Name:</FormLabel>
            <FormInput
              id="faculty"
              name="faculty"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.faculty}
            />
            {formik.errors.faculty && <FormError>{formik.errors.faculty}</FormError>}
          </FormField>
        )}

        {formik.values.type === 'department' && (
          <FormField>
            <FormLabel htmlFor="department">Department Name:</FormLabel>
            <FormInput
              id="department"
              name="department"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.department}
            />
            {formik.errors.department && <FormError>{formik.errors.department}</FormError>}
          </FormField>
        )}

        <button type="submit">Create Election</button>
      </form>
    </FormContainer>
  );
};

export default CreateElection;
