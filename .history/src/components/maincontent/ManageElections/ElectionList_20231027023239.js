import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
} from '@chakra-ui/react';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialPositions = {
    General: [
      { name: 'President', description: 'Description for President' },
      { name: 'Vice President', description: 'Description for Vice President' },
    ],
    Faculty: [],
    Departmental: [],
    Hall: [],
  };

  const [newPosition, setNewPosition] = useState({
    category: 'General',
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
    const updatedPositions = { ...positions };
    updatedPositions[newPosition.category].push({
      name: newPosition.name,
      description: newPosition.description,
    });
    setPositions(updatedPositions);
    setNewPosition({ category: 'General', name: '', description: '' });
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
            <Th>Category</Th>
            <Th>Position Name</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(positions).map((category) =>
            positions[category].map((position, index) => (
              <Tr key={index}>
                <Td>{category}</Td>
                <Td>{position.name}</Td>
                <Td>{position.description}</Td>
              </Tr>
            ))
          )}
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
                <FormLabel>Category</FormLabel>
                <Select
                  value={newPosition.category}
                  onChange={(e) => setNewPosition({ ...newPosition, category: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Departmental">Departmental</option>
                  <option value="Hall">Hall</option>
                </Select>
              </FormControl>
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
