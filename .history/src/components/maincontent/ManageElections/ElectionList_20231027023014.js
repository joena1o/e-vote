import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialPosition = { id: '', name: '' };
  const [newPosition, setNewPosition] = useState(initialPosition);

  useEffect(() => {
    // Mock data for testing
    const mockPositions = {
      general: [
        { id: '1', name: 'President' },
        { id: '2', name: 'Vice President' },
      ],
      faculty: [
        { id: '3', name: 'Faculty President' },
        { id: '4', name: 'Faculty Secretary' },
      ],
      departmental: [
        { id: '5', name: 'Department Head' },
        { id: '6', name: 'Department Secretary' },
      ],
      hall: [
        { id: '7', name: 'Hall President' },
        { id: '8', name: 'Hall Secretary' },
      ],
    };

    setPositions(mockPositions);
  }, []);

  const handleAddPosition = () => {
    // Add the new position to the positions state
    setPositions({
      ...positions,
      [newPosition.electionType]: [
        ...positions[newPosition.electionType],
        { id: newPosition.id, name: newPosition.name },
      ],
    });

    // Clear the form and close the modal
    setNewPosition(initialPosition);
    onClose();
  };

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1" size="md" mb={6}>
        Available Positions
      </Heading>

      {loading && <Text>Loading positions...</Text>}
      {error && <Text color="red.500">Error fetching positions. Please try again.</Text>}

      <VStack spacing={6} align="start" w="100%">
        {Object.keys(positions).map((electionType) => (
          <Box key={electionType} p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <Heading as="h3" size="lg" mb={3}>
              {`${electionType.charAt(0).toUpperCase() + electionType.slice(1)} Positions`}
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Position</Th>
                </Tr>
              </Thead>
              <Tbody>
                {positions[electionType].map((position) => (
                  <Tr key={position.id}>
                    <Td>{position.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button
              mt={3}
              colorScheme="teal"
              variant="outline"
              leftIcon={<AddIcon />}
              onClick={() => {
                setNewPosition({ electionType, id: '', name: '' });
                onOpen();
              }}
            >
              Add Position
            </Button>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Text mb={2} fontWeight="bold">
                Election Type: {newPosition.electionType}
              </Text>
              <Input
                placeholder="Position Name"
                value={newPosition.name}
                onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddPosition}>
              Add Position
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PositionList;
