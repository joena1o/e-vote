import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, FormErrorMessage, Table, Thead, Tbody, Tr, Th, Td, Alert, AlertIcon, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton } from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [hallAdminEmail, setHallAdminEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [entries, setEntries] = useState([]);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOption(null);
    setSelectedFaculty(null);
    setNewItemName('');
    setHodEmail('');
    setHallAdminEmail('');
    setEmailError('');
  };

  const handleDeleteConfirmationModalClose = () => {
    setDeleteConfirmationModal(false);
    setDeleteIndex(null);
  };

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Hide the alert after 3 seconds
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

    // Mock API request for adding a new item
    // ...

    // Update the entries state
    setEntries([...entries, newItem]);

    // Show success alert
    showAlert();

    // Close the modal
    handleModalClose();
  };

  const handleDeleteItem = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmationModal(true);
  };

  const confirmDelete = () => {
    // Handle deleting item logic here
    const updatedEntries = [...entries];
    updatedEntries.splice(deleteIndex, 1);
    setEntries(updatedEntries);

    // Show Chakra UI Alert
    showAlert();

    // Close the delete confirmation modal
    handleDeleteConfirmationModalClose();
  };

  const options = [
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' },
    { value: 'hall', label: 'Hall' },
  ];

  // Static list of faculties (replace with dynamic fetching in a real application)
  const existingFaculties = [
    { value: 'faculty1', label: 'Faculty 1' },
    { value: 'faculty2', label: 'Faculty 2' },
  ];

  // Mock data for the table
  const mockData = [
    { type: 'faculty', name: 'Faculty 1', faculty: 'None', hodEmail: 'hod1@example.com', hallAdminEmail: '' },
    { type: 'department', name: 'Department 1', faculty: 'Faculty 1', hodEmail: 'hod1@example.com', hallAdminEmail: 'admin1@example.com' },
    { type: 'hall', name: 'Hall 1', faculty: 'None', hodEmail: '', hallAdminEmail: 'admin1@example.com' },
  ];

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
            <ModalHeader>Add {selectedOption ? selectedOption.label : ''}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                      <label>Faculty Name</label>
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
                      <label>Select Faculty</label>
                      <Select
                        options={[{ value: 'none', label: 'None' }, ...existingFaculties]}
                        value={selectedFaculty}
                        onChange={(selected) => setSelectedFaculty(selected)}
                        placeholder="Choose Faculty"
                      />
                      <label>Department Name</label>
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
                      <label>Hall Name</label>
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
                Add
              </Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteItem(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Chakra UI Alert for success message */}
        {isAlertVisible && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            Item added/deleted successfully!
          </Alert>
        )}

        {/* Delete Confirmation Modal */}
        <AlertDialog
          isOpen={deleteConfirmationModal}
          onClose={handleDeleteConfirmationModalClose}
          leastDestructiveRef={undefined}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Confirmation
              </AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>
                Are you sure you want to delete this item?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={confirmDelete}>
                  Delete
                </Button>
                <Button onClick={handleDeleteConfirmationModalClose} ml={3}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
