import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { API } from 'aws-amplify';
import Papa from 'papaparse';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addStudents } from '../../../Redux/studentsSlice';

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ce7348;
`;

const RegisterStudents = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file before uploading.');
      return;
    }

    setLoading(true);
    try {
      // Parse the CSV file
      Papa.parse(file, {
        complete: async (result) => {
          // Validate data structure
          const expectedHeaders = [
            'name', 'matriculationNumber', 'faculty', 'department', 'level', 'email', 'phone'
          ];
          if (!expectedHeaders.every(header => result.meta.fields.includes(header))) {
            toast.error('Invalid file format. Please check the data and try again.');
            return;
          }
          
          // Send data to AWS Lambda function via API Gateway
          await API.post('yourApiName', '/register-students', { body: { students: result.data } });
          // Update Redux store
          dispatch(addStudents(result.data));
          toast.success('Students registered successfully!');
        },
        header: true,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to register students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Register Students</h1>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <Button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload and Register Students'}
      </Button>
    </Container>
  );
};

export default RegisterStudents;
