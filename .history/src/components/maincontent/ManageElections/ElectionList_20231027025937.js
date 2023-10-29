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
} from '@chakra-ui/react';
import Select from 'react-select';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialPositions = {
    General: [
      { name: 'President' },
      { name: 'Vice President' },
    ],
    Faculty: [],
    Departmental: [],
    Hall: [],
  };

  

  const [newPosition, setNewPosition] = useState({
    category: 'General',
    name: '',
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
    });
    setPositions(updatedPositions);
    setNewPosition({ category: 'General', name: '' });
    closeModal();
  };

  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'Faculty', label: 'Faculty' },
    { value: 'Departmental', label: 'Departmental' },
    { value: 'Hall', label: 'Hall' },
  ];

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
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(positions).map((category) =>
            positions[category].map((position, index) => (
              <Tr key={index}>
                <Td>{category}</Td>
                <Td>{position.name}</Td>
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
                  options={categoryOptions}
                  value={{ value: newPosition.category, label: newPosition.category }}
                  onChange={(option) => setNewPosition({ ...newPosition, category: option.value })}
                />
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
