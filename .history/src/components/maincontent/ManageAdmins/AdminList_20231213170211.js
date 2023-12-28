import React, { useState } from 'react';
import { ChakraProvider, VStack, FormControl, FormLabel, Input, Button, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import ReactSelect from 'react-select';

const departments = [
  { value: 'french', label: 'French Department', hodEmail: 'french_hod@example.com' },
  { value: 'english', label: 'English Department', hodEmail: 'english_hod@example.com' },
  // Add more departments as needed
];

const halls = [
  { value: 'blockC', label: 'Block C', adminEmail: 'block_c_admin@example.com' },
  { value: 'blockD', label: 'Block D', adminEmail: 'block_d_admin@example.com' },
  // Add more halls as needed
];

const ElectionForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [addType, setAddType] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access the associated HOD and Hall Admin emails
    const hodEmail = selectedDepartment?.hodEmail || '';
    const hallAdminEmail = selectedHall?.adminEmail || '';

    // Handle form submission logic here, including HOD and Hall Admin emails
    console.log('Selected Department:', selectedDepartment?.label);
    console.log('HOD Email:', hodEmail);
    console.log('Selected Hall:', selectedHall?.label);
    console.log('Hall Admin Email:', hallAdminEmail);
  };

  const handleAddButtonClick = (type) => {
    setAddType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setAddType(null);
    setNewItemName('');
  };

  const handleAddItem = () => {
    // Handle adding new item logic here based on addType
    console.log('Adding new', addType, 'with name:', newItemName);

    // Close the modal
    handleModalClose();
  };

  return (
    <ChakraProvider>
      <Box borderWidth="1px" borderRadius="lg" p={4} maxW="400px" m="auto">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Department</FormLabel>
              <ReactSelect
                options={departments}
                onChange={(selectedOption) => setSelectedDepartment(selectedOption)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Head of Department (HOD) Email</FormLabel>
              <Input type="email" placeholder="Enter HOD Email" />
            </FormControl>

            <FormControl>
              <FormLabel>Hall</FormLabel>
              <ReactSelect
                options={halls}
                onChange={(selectedOption) => setSelectedHall(selectedOption)}
              />
            </FormControl>

            {selectedHall && (
              <FormControl>
                <FormLabel>Hall Admin Email</FormLabel>
                <Input type="email" placeholder="Enter Hall Admin Email" />
              </FormControl>
            )}

            <Button type="submit" colorScheme="teal" mt={4}>
              Submit
            </Button>

            {/* Add Button */}
            <Button colorScheme="blue" onClick={() => handleAddButtonClick('faculty')} mt={4}>
              Add Hall/Department/Faculty
            </Button>
          </VStack>
        </form>

        {/* Modal for Adding Hall/Department/Faculty */}
        <Modal isOpen={showModal} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add {addType}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {addType === 'faculty' && (
                <FormControl>
                  <FormLabel>Faculty Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Faculty Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </FormControl>
              )}

              {addType === 'department' && (
                <FormControl>
                  <FormLabel>Select Faculty</FormLabel>
                  <ReactSelect
                    options={departments}
                    onChange={(selectedOption) => setSelectedDepartment(selectedOption)}
                  />
                  <FormLabel>Department Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Department Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </FormControl>
              )}

              {addType === 'hall' && (
                <FormControl>
                  <FormLabel>Hall Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Hall Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
                Add
              </Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default ElectionForm;
