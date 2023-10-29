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
  const [positions, setPositions] = useState([
    { category: 'General', name: 'President' },
    { category: 'General', name: 'Vice President' },
    { category: 'Faculty', name: 'Faculty President' },
    { category: 'Faculty', name: 'Faculty Secretary' },
    { category: 'Departmental', name: 'Department President' },
    { category: 'Departmental', name: 'Department Secretary' },
    { category: 'Hall', name: 'Hall President' },
    { category: 'Hall', name: 'Hall Secretary' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setPositions([...positions, { ...newPosition }]);
    setNewPosition({ category: 'General', name: '' });
    closeModal();
  };

  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'Faculty', label: 'Faculty' },
    { value: 'Departmental', label: 'Departmental' },
    { value: 'Hall', label: 'Hall' },
  ];

  // Group positions by category
  const groupedPositions = {};
  positions.forEach((position) => {
    const { category, name } = position;
    if (!groupedPositions[category]) {
      groupedPositions[category] = [];
    }
    groupedPositions[category].push(name);
  });

  return (
    <Box>
      <Button onClick={openModal} colorScheme="yellow">
        Add Position
      </Button>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Position Names</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(groupedPositions).map((category) => (
            <Tr key={category}>
              <Td>{category}</Td>
              <Td>{groupedPositions[category].join(', ')}</Td>
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
