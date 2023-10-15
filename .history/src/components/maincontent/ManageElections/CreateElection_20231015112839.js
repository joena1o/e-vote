import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createElection } from '../../../Redux/electionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%; /* Make the form occupy 100% width */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
`;

const FormHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
      <FormHeader>Create Election</FormHeader>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Election Name:</Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Election Type:</Label>
          <Select
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="" label="Select type" />
            <option value="general" label="General" />
            <option value="faculty" label="Faculty" />
            <option value="department" label="Department" />
          </Select>
          {formik.errors.type ? <ErrorMessage>{formik.errors.type}</ErrorMessage> : null}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Election Date:</Label>
          <Input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.date ? formik.values.date : ''}
          />
          {formik.errors.date ? <ErrorMessage>{formik.errors.date}</ErrorMessage> : null}
        </FormGroup>

        {formik.values.type === 'faculty' && (
          <FormGroup>
            <Label htmlFor="faculty">Faculty Name:</Label>
            <Input
              id="faculty"
              name="faculty"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.faculty}
            />
            {formik.errors.faculty ? <ErrorMessage>{formik.errors.faculty}</ErrorMessage> : null}
          </FormGroup>
        )}

        {formik.values.type === 'department' && (
          <FormGroup>
            <Label htmlFor="department">Department Name:</Label>
            <Input
              id="department"
              name="department"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.department}
            />
            {formik.errors.department ? <ErrorMessage>{formik.errors.department}</ErrorMessage> : null}
          </FormGroup>
        )}

        <SubmitButton type="submit">Create Election</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateElection;
