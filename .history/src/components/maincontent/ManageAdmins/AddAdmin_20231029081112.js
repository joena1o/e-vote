import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import Select from 'react-select';
import {
  useColorMode,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';

Modal.setAppElement('#root'); // For accessibility reasons

const darkThemeStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#333',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#555' : '#333',
    color: 'white',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: '#444',
    color: 'white',
    borderColor: '#555',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
};

function AddAdmin() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [admins, setAdmins] = useState([]);
  const { colorMode } = useColorMode();
  const toast = useToast();

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

        setModalMessage(
          'Admin added successfully! An email with a temporary password has been sent.'
        );
        setModalIsOpen(true);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding admin:', error);
        setModalMessage('Error adding admin. Please try again.');
        setModalIsOpen(true);
      }
    },
  });

  useEffect(() => {
    // Fetch admin data and populate the admins array
    const fetchAdmins = async () => {
      try {
        const adminData = await API.get('AdminAPI', '/admins');
        setAdmins(adminData);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <>
      <h3>Add New Admin</h3>
      <FormControl as="form" onSubmit={formik.handleSubmit}>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          required
        />

        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />

        <FormLabel>Role:</FormLabel>
        <Select
          value={roleOptions.find(
            (option) => option.value === formik.values.role
          )}
          onChange={(option) => formik.setFieldValue('role', option.value)}
          options={roleOptions}
          isSearchable={false}
          styles={colorMode === 'dark' ? darkThemeStyles : {}}
        />

        <Button type="submit" mt={4} colorScheme="teal">
          Add Admin
        </Button>
      </FormControl>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={() => setModalIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box mt={8}>
        <h3>Admins</h3>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {admins.map((admin) => (
              <Tr key={admin.id}>
                <Td>{admin.name}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default AddAdmin;
