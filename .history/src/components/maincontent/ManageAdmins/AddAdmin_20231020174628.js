import React, { useState } from 'react';
import styled from 'styled-components';
import { API, Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import Select from 'react-select';
import { useColorMode } from '@chakra-ui/react';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // For accessibility reasons

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

const StyledModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background: ${props => props.colorMode === 'dark' ? '#333' : '#fff'};
    padding: 20px;
    border-radius: 8px;
    outline: none;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
`;

const CloseIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    color: #ce7348;
`;

function AddAdmin() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { colorMode } = useColorMode();

    const roleOptions = [
        { value: 'Super Admin', label: 'Super Admin' },
        { value: 'Student Affairs', label: 'Student Affairs' },
    ];

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: 'Super Admin',
        },
        onSubmit: async (values) => {
            try {
                // Your AWS Amplify logic...
                const temporaryPassword = Math.random().toString(36).slice(-8);
                const signUpResponse = await Auth.signUp({
                    username: values.email,
                    password: temporaryPassword,
                    attributes: {
                        email: values.email,
                    },
                });

                if (!signUpResponse.userConfirmed) {
                    await Auth.completeNewPassword(signUpResponse, temporaryPassword);
                }

                await API.post('AdminAPI', '/admins', {
                    body: values,
                });

                setModalMessage('Admin added successfully! An email with a temporary password has been sent.');
                setModalIsOpen(true);
                formik.resetForm();

            } catch (error) {
                console.error('Error adding admin:', error);
                setModalMessage('Error adding admin. Please try again.');
                setModalIsOpen(true);
            }
        },
    });

    return (
        <>
            <h3>Add New Admin</h3>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                </FormGroup>

                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
                </FormGroup>

                <FormGroup>
                    <Label>Role:</Label>
                    <StyledSelect 
                        value={roleOptions.find(option => option.value === formik.values.role)}
                        onChange={option => formik.setFieldValue('role', option.value)}
                        options={roleOptions}
                        isSearchable={false}
                        styles={colorMode === 'dark' ? darkThemeStyles : {}}
                    />
                </FormGroup>

                <Button type="submit">Add Admin</Button>
            </Form>
            <StyledModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                colorMode={colorMode}
            >
                <CloseIcon onClick={() => setModalIsOpen(false)}>×</CloseIcon>
                <h2>Notification</h2>
                <p>{modalMessage}</p>
            </StyledModal>
        </>
    );
}

export default AddAdmin;
