import React, { useState, useMemo } from 'react';
import {
  Box,
  VStack,
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
  FormControl,
  FormLabel,
  Container,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Select from 'react-select';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AddAdmin = () => {
  const colorModeValue = useColorModeValue('gray.200', 'gray.600');

  const [isOpen, setIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const initialAdminData = {
    name: '',
    email: '',
    role: { value: 'Super Admin', label: 'Super Admin' },
  };

  const [adminData, setAdminData] = useState(initialAdminData);

  


  const handleInputChange = (name, value) => {
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
    console.log('Admin Data Submitted:', adminData);
    setAdmins([...admins, adminData]);
    closeModal();
  };

  const handleEditAdmin = (index) => {
    console.log('Editing admin at index:', index);
  };

  const handleDeleteAdmin = (index) => {
    console.log('Deleting admin at index:', index);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAdmins = useMemo(() => {
    let sortableAdmins = [...admins];
    if (sortConfig.key) {
      sortableAdmins.sort((a, b) => {
        const keyA = a[sortConfig.key];
        const keyB = b[sortConfig.key];
        if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableAdmins;
  }, [admins, sortConfig]);

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
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role:</FormLabel>
                  <Select
                    options={[
                      { value: 'Super Admin', label: 'Super Admin' },
                      { value: 'Petition Panel', label: 'Petition Panel' },
                    ]}
                    value={adminData.role}
                    onChange={(selectedOption) =>
                      handleInputChange('role', selectedOption)
                    }
                  />
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
            <Th onClick={() => handleSort('name')}>S/N</Th>
            <Th onClick={() => handleSort('name')}>Name</Th>
            <Th onClick={() => handleSort('email')}>Email</Th>
            <Th onClick={() => handleSort('role.label')}>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedAdmins.map((admin, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.role.label}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEditAdmin(index)}
                  aria-label="Edit"
                  colorScheme="yellow"
                  mr={2}
                />
                <IconButton
                  icon={<FaTrash />}
                  onClick={() => handleDeleteAdmin(index)}
                  aria-label="Delete"
                  bg="#ce7348"
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
