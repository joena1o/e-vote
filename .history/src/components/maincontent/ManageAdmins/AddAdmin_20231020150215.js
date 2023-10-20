import React, { useState } from 'react';
import styled from 'styled-components';
import { API, Auth } from 'aws-amplify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { useColorMode } from '@chakra-ui/react';

const darkThemeStyles = {
  menu: provided => ({
    ...provided,
    backgroundColor: '#333',
    color: 'white'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#333',
    color: 'white'
  }),
  control: provided => ({
    ...provided,
    backgroundColor: '#444',
    color: 'white',
    borderColor: '#555'
  }),
  singleValue: provided => ({
    ...provided,
    color: 'white'
  })
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 3px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
`;

const StyledSelect = styled(Select)`
  flex: 1;
`;

const Button = styled.button`
  background-color: #ce7348;
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

    const { colorMode } = useColorMode();

    const roleOptions = [
      { value: 'Election Committee', label: 'Election Committee' },
      { value: 'Super Admin', label: 'Super Admin' },
      { value: 'Student Affairs', label: 'Student Affairs' },
    ];
  
    const handleRoleChange = (selectedOption) => {
      setAdminData({
        ...adminData,
        role: selectedOption.value,
      });
    };
  
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
      <>
        <h3>Add New Admin</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name:</Label>
            <Input type="text" name="name" value={adminData.name} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>Email:</Label>
            <Input type="email" name="email" value={adminData.email} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label>Role:</Label>
            <StyledSelect 
              value={roleOptions.find(option => option.value === adminData.role)}
              onChange={handleRoleChange}
              options={roleOptions}
              name="role"
              isSearchable={false}
              required
              styles={colorMode === 'dark' ? darkThemeStyles : {}}
            />
          </FormGroup>

          <Button type="submit">Add Admin</Button>
        </Form>
        <ToastContainer />
      </>
    );
}

export default AddAdmin;