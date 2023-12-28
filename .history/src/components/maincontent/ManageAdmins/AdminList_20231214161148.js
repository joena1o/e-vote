import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, FormErrorMessage, Table, Thead, Tbody, Tr, Th, Td, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const { isOpen: isDeleteAlertOpen, onOpen: onOpenDeleteAlert, onClose: onCloseDeleteAlert } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [hallAdminEmail, setHallAdminEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Static list of faculties (replace with dynamic fetching in a real application)
  const existingFaculties = [
    { value: 'faculty1', label: 'Faculty 1' },
    { value: 'faculty2', label: 'Faculty 2' },
  ];

  const handleAddButtonClick = () => {
    setEditIndex(null); // Clear edit index
    setSelectedOption(null);
    onOpenDeleteAlert(); // Open modal
  };

  const handleModalClose = () => {
    setSelectedOption(null);
    setSelectedFaculty(null);
    setNewItemName('');
    setHodEmail('');
    setHallAdminEmail('');
    setEmailError('');
    onCloseDeleteAlert(); // Close modal
  };

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddItem = () => {
    // Validate email fields
    if (selectedOption?.value === 'faculty' && !validateEmail(hodEmail)) {
      setEmailError('Invalid HOD email');
      return;
    }

    if (selectedOption?.value === 'department' && (!validateEmail(hodEmail) || !validateEmail(hallAdminEmail))) {
      setEmailError('Invalid email(s)');
      return;
    }

    if (selectedOption?.value === 'hall' && !validateEmail(hallAdminEmail)) {
      setEmailError('Invalid Hall Admin email');
      return;
    }

    // Handle adding new item logic here based on selectedOption, selectedFaculty, hodEmail, and hallAdminEmail
    const newItem = {
      type: selectedOption?.value,
      name: newItemName,
      faculty: selectedFaculty?.value || 'None',
      hodEmail,
      hallAdminEmail,
    };

    if (editIndex !== null) {
      // Update existing entry if in edit mode
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newItem;
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, newItem]);
    }

    // Close the modal
    handleModalClose();
  };

  const handleDeleteItem = (index) => {
    setEditIndex(null); // Clear edit index
    onOpenDeleteAlert(); // Open delete confirmation modal
  };

  const handleConfirmDelete = () => {
    // Handle deleting item logic here
    const updatedEntries = [...entries];
    updatedEntries.splice(editIndex, 1);
    setEntries(updatedEntries);

    // Close the delete confirmation modal
    onCloseDeleteAlert();
  };

  const options = [
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' },
    { value: 'hall', label: 'Hall' },
  ];

  return (
    <ChakraProvider>
      <div>
        {/* Add Button */}
        <Button colorScheme="blue" onClick={handleAddButtonClick} mt={4}>
          Click to Add
        </Button>

        {/* Modal for Adding/Editing Hall/Department/Faculty */}
        <AlertDialog isOpen={isDeleteAlertOpen} onClose={onCloseDeleteAlert} isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {editIndex !== null ? `Edit ${selectedOption?.label}` : `Add ${selectedOption?.label}`}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {/* Dropdown to select item type */}
              <Select
                options={options}
                value={selectedOption}
                onChange={(selected) => setSelectedOption(selected)}
                placeholder="Click to Add"
              />

              {selectedOption && (
                <div>
                  {selectedOption.value === 'faculty' && (
                    <div>
                      <FormControl id="hodEmail" isRequired>
                        <FormLabel>HOD's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter HOD's Email"
                          value={hodEmail}
                          onChange={(e) => setHodEmail(e.target.value)}
                        />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      </FormControl>
                      <FormLabel>Faculty Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter Faculty Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                    </div>
                  )}

                  {selectedOption.value === 'department' && (
                    <div>
                      <FormControl id="hodEmail" isRequired>
                        <FormLabel>HOD's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter HOD's Email"
                          value={hodEmail}
                          onChange={(e) => setHodEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="hallAdminEmail" isRequired>
                        <FormLabel>Hall Admin's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter Hall Admin's Email"
                          value={hallAdminEmail}
                          onChange={(e) => setHallAdminEmail(e.target.value)}
                        />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      </FormControl>
                      <FormLabel>Select Faculty</FormLabel>
                      <Select
                        options={[{ value: 'none', label: 'None' }, ...existingFaculties]}
                        value={selectedFaculty}
                        onChange={(selected) => setSelectedFaculty(selected)}
                        placeholder="Choose Faculty"
                      />
                      <FormLabel>Department Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter Department Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                    </div>
                  )}

                  {selectedOption.value === 'hall' && (
                    <div>
                      <FormControl id="hallAdminEmail" isRequired>
                        <FormLabel>Hall Admin's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter Hall Admin's Email"
                          value={hallAdminEmail}
                          onChange={(e) => setHallAdminEmail(e.target.value)}
                        />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      </FormControl>
                      <FormLabel>Hall Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter Hall Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
                {editIndex !== null ? 'Edit' : 'Add'}
              </Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Table to display entries */}
        <Table mt={4} variant="simple">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Name</Th>
              <Th>Faculty</Th>
              <Th>HOD's Email</Th>
              <Th>Hall Admin's Email</Th>
              <Th>Action</Th>
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
                <Td>
                  <Button colorScheme="teal" size="sm" onClick={() => setEditIndex(index)}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteItem(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
