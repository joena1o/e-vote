/*import React, { useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { updateProfileMutation } from './graphql/mutations'; 

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
`;

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Error changing password');
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.graphql(graphqlOperation(updateProfileMutation, { input: { name, email } }));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <Container>
      <h1>Settings</h1>
      
      <Form onSubmit={changePassword}>
        <h2>Change Password</h2>
        <Label>Old Password</Label>
        <Input 
          type="password" 
          value={oldPassword} 
          onChange={(e) => setOldPassword(e.target.value)} 
          required 
        />
        <Label>New Password</Label>
        <Input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <Button type="submit">Change Password</Button>
      </Form>
      
      <Form onSubmit={updateProfile}>
        <h2>Edit Profile</h2>
        <Label>Name</Label>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <Label>Email</Label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Button type="submit">Update Profile</Button>
      </Form>
      
      <toast.Container />
    </Container>
  );
};

export default Settings;*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
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
      
      <Form onSubmit={changePassword}>
        <h2>Change Password</h2>
        <Label>Old Password</Label>
        <Input 
          type="password" 
          value={oldPassword} 
          onChange={(e) => setOldPassword(e.target.value)} 
          required 
        />
        <Label>New Password</Label>
        <Input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <Button type="submit">Change Password</Button>
      </Form>
      
      <Form onSubmit={updateProfile}>
        <h2>Edit Profile</h2>
        <Label>Name</Label>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <Label>Email</Label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Button type="submit">Update Profile</Button>
      </Form>
      
      <ToastContainer />
    </Container>
  );
};

export default Settings;
