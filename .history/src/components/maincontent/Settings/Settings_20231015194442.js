import React, { useState } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  padding: 20px;
`;

const FormContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #ce7348; /* Background color for the button */
  color: #fff; /* Text color for the button */
  border: none;
  cursor: pointer;
`;


const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      toast.error('New password must be at least 6 characters long');
      return;
    }
    // Mock success
    toast.success('Password changed successfully');
    setOldPassword('');
    setNewPassword('');
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    // Mock success
    toast.success('Profile updated successfully');
  };

  return (
    <Container>
      <h1>Settings</h1>

      <FormContainer>
        <Form onSubmit={changePassword}>
          <h2>Change Password</h2>
          <FormGroup>
            <Label>Old Password</Label>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Change Password</Button>
        </Form>
      </FormContainer>

      <FormContainer>
        <Form onSubmit={updateProfile}>
          <h2>Edit Profile</h2>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit">Update Profile</Button>
        </Form>
      </FormContainer>

      <ToastContainer />
    </Container>
  );
};

export default Settings;
