import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, VStack, Select } from '@chakra-ui/react';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialPositions = [
    { name: 'President', description: 'Description for President' },
    { name: 'Vice President', description: 'Description for Vice President' },
    // Add more mock positions as needed
  ];

  const [newPosition, setNewPosition] = useState({
    name: '',
    description: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setPositions([...positions, newPosition]);
    setNewPosition({ name: '', description: '' });
    closeModal();
  };

  return (
    <Box>
      <Button onClick={openModal} colorScheme="yellow">
        Add Position
      </Button>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Election Position</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {positions.map((position, index) => (
            <Tr key={index}>
              <Td>{position.name}</Td>
              <Td>{position.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Position Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter position name"
                  value={newPosition.name}
                  onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({ ...newPosition, description: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={handleSubmit}>
              Add
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PositionList;
