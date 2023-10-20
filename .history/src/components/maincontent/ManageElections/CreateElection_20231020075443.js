import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FaVoteYea, FaCalendar, FaSchool, FaBuilding, FaUserTie, FaUsers } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 2em;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  width: 500px;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
`;

const FormField = styled.div`
  position: relative;
  margin-bottom: 1em;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8em 0.8em 0.8em 2.5em;
  border-radius: 5000px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1em;

  &:focus {
    outline: none;
    background-color: rgba(255,255,255,0.2);
  }
`;

const Select = styled.select`
  ${Input}
`;

const Button = styled.button`
  padding: 0.8em 1.5em;
  border-radius: 5000px;
  border: none;
  background-color: #ce7348;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #9a552e;
  }
`;

const CreateElection = () => {
  const formik = useFormik({
    // ... [Your useFormik logic]
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FormField>
          <Icon><FaVoteYea /></Icon>
          <Input placeholder="Election Name" {...formik.getFieldProps('name')} />
        </FormField>

        <FormField>
          <Icon><FaUserTie /></Icon>
          <Select {...formik.getFieldProps('type')}>
            {/* Your select options */}
          </Select>
        </FormField>

        <FormField>
          <Icon><FaCalendar /></Icon>
          <Input type="date" placeholder="Election Date" {...formik.getFieldProps('date')} />
        </FormField>

        {formik.values.type === 'faculty' && (
          <FormField>
            <Icon><FaSchool /></Icon>
            <Input placeholder="Faculty Name" {...formik.getFieldProps('faculty')} />
          </FormField>
        )}

        {formik.values.type === 'department' && (
          <FormField>
            <Icon><FaBuilding /></Icon>
            <Input placeholder="Department Name" {...formik.getFieldProps('department')} />
          </FormField>
        )}

        <FormField>
          <Icon><FaUsers /></Icon>
          <Input placeholder="Election Committee" {...formik.getFieldProps('committee')} />
        </FormField>

        <Button type="submit">Create Election</Button>
      </Form>
    </Container>
  );
};

export default CreateElection;
