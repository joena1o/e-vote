import React, { useState } from 'react';
import styled from 'styled-components';
import { API, Auth } from 'aws-amplify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: linear-gradient(to right, #ce7348, #9a552e);
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

function AddAdmin() {
    const [adminData, setAdminData] = useState({
      name: '',
      email: '',
      role: 'Election Committee',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAdminData({
        ...adminData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const temporaryPassword = Math.random().toString(36).slice(-8);
  
        const signUpResponse = await Auth.signUp({
          username: adminData.email,
          password: temporaryPassword,
          attributes: {
            email: adminData.email,
          },
        });
  
        if (!signUpResponse.userConfirmed) {
          // Assuming you want to use the temporary password as the new password upon first login
          await Auth.completeNewPassword(signUpResponse, temporaryPassword);
        }
  
        const apiResponse = await API.post('AdminAPI', '/admins', {
          body: adminData,
        });
  
        console.log('Admin Added:', apiResponse);
  
        toast.success('Admin added successfully! An email with a temporary password has been sent.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        setAdminData({
          name: '',
          email: '',
          role: 'Election Committee',
        });
      } catch (error) {
        console.error('Error adding admin:', error);
  
        toast.error('Error adding admin. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
  
    return (
      <Container>
        <h3>Add New Admin</h3>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input type="text" name="name" value={adminData.name} onChange={handleChange} required />
          </Label>
          <Label>
            Email:
            <Input type="email" name="email" value={adminData.email} onChange={handleChange} required />
          </Label>
          <Label>
            Role:
            <select name="role" value={adminData.role} onChange={handleChange} required>
              <option value="Election Committee">Election Committee</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Student Affairs">Student Affairs</option>
            </select>
          </Label>
          <Button type="submit">Add Admin</Button>
        </Form>
        <ToastContainer />
      </Container>
    );
  }
  
  export default AddAdmin;