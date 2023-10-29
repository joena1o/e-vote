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
  const [admins, setAdmins] = useState([]);

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
  bg="brown" // Set the background color to brown
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
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default AddAdmin;
