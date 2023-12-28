import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([
    { type: 'faculty', name: 'Faculty 1', faculty: 'None', hodEmail: 'faculty1@example.com', hallAdminEmail: '' },
    { type: 'department', name: 'Department 1', faculty: 'Faculty 2', hodEmail: 'department1@example.com', hallAdminEmail: 'hallAdmin1@example.com' },
    { type: 'hall', name: 'Hall 1', faculty: 'None', hodEmail: '', hallAdminEmail: 'hallAdmin2@example.com' },
  ]);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <ChakraProvider>
      <div>
        {/* Add Button */}
        <Button colorScheme="blue" onClick={handleAddButtonClick} mt={4}>
          Click to Add
        </Button>

        {/* Modal for Adding Hall/Department/Faculty */}
        <Modal isOpen={showModal} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Display entries */}
              <Table mt={4} variant="simple">
                <Thead>
                  <Tr>
                    <Th>Type</Th>
                    <Th>Name</Th>
                    <Th>Faculty</Th>
                    <Th>HOD's Email</Th>
                    <Th>Hall Admin's Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {entries.map((entry, index) => (
                    <Tr key={index}>
                      <Td>{entry.type}</Td>
                      <Td>{entry.name}</Td>
                      <Td>{entry.faculty}</Td>
                      <Td>{entry.hodEmail}</Td>
                      <Td>{entry.hallAdminEmail}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
