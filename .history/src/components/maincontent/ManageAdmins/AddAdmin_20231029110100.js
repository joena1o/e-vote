import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddAdmin = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const [isOpen, setIsOpen] = useState(false);

  const initialAdminData = {
    name: '',
    email: '',
    role: 'Super Admin',
  };

  const [adminData, setAdminData] = useState(initialAdminData);

  // Mock data for admins
  const [admins, setAdmins] = useState([
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Super Admin',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'Student Affairs',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAdminData(initialAdminData);
  };

  const handleSubmit = () => {
    // Add your logic to handle admin data submission here
    console.log('Admin Data Submitted:', adminData);

    // Add the admin data to the admins state
    setAdmins([...admins, adminData]);

    closeModal();
  };

  const handleEditAdmin = (index) => {
    // Add logic to edit admin here, e.g., open a modal for editing
    console.log('Editing admin at index:', index);
  };

  const handleDeleteAdmin = (index) => {
    // Add logic to delete admin here, e.g., show a confirmation modal
    console.log('Deleting admin at index:', index);
  };

  return (
    <Container maxW="100vw" w="100" p={0}>
      <Box>
        <Button colorScheme="yellow" onClick={openModal}>
          Add Admin
        </Button>

        <Modal isOpen={isOpen} onClose={closeModal} size="sm">
          <ModalOverlay />
          <ModalContent
            borderRadius="8px"
            bg={colorModeValue}
            color={colorModeValue === 'gray.200' ? 'black' : 'white'}
          >
            <ModalHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottom="1px solid"
              borderColor={
                colorModeValue === 'gray.200' ? 'gray.300' : 'gray.600'
              }
            >
              Add New Admin
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name:</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={adminData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role:</FormLabel>
                  <Select
                    name="role"
                    value={adminData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Student Affairs">Student Affairs</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter
              borderTop="1px solid"
              borderColor={
                colorModeValue === 'gray.200' ? 'gray.300' : 'gray.600'
              }
            >
              <Button
                bg="brown"
                color="white"
                _hover={{ bg: 'brown.600' }}
                _focus={{ boxShadow: 'none' }}
                onClick={handleSubmit}
              >
                Add Admin
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Table variant="simple" mt={4} w="100%">
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.role}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="blue"
                  onClick={() => handleEditAdmin(index)}
                  aria-label="Edit"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDeleteAdmin(index)}
                  aria-label="Delete"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default AddAdmin;
