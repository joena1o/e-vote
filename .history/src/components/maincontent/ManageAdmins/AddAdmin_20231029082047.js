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
} from '@chakra-ui/react';

const AddAdmin = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const [isOpen, setIsOpen] = useState(false);

  const initialAdminData = {
    name: '',
    email: '',
    role: 'Super Admin',
  };

  const [adminData, setAdminData] = useState(initialAdminData);

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
    closeModal();
  };

  return (
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
            borderColor={colorModeValue === 'gray.200' ? 'gray.300' : 'gray.600'}
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
          <ModalFooter borderTop="1px solid" borderColor={colorModeValue === 'gray.200' ? 'gray.300' : 'gray.600'}>
          <Button
  bg="brown.500" // Set the background color to brown
  color="white" // Set the text color to white
  _hover={{ bg: 'brown.600' }} // Set the hover background color
  _focus={{ boxShadow: 'none' }}
  onClick={handleSubmit}
>
  Add Admin
</Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddAdmin;
