import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [deansEmail, setDeansEmail] = useState('');
  const [hallAdminEmail, setHallAdminEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const modalSize = 'sm';
  // Initial mock data for presentation
  const initialEntries = [
    { type: 'faculty', name: 'Faculty 1', faculty: 'None', deansEmail: 'dean1@example.com', hallAdminEmail: '' },
    { type: 'department', name: 'Department 1', faculty: 'Faculty 1', deansEmail: 'dean1@example.com', hallAdminEmail: 'admin1@example.com' },
    { type: 'hall', name: 'Hall 1', faculty: 'None', deansEmail: '', hallAdminEmail: 'halladmin1@example.com' },
  ];

  // Static list of faculties (replace with dynamic fetching in a real application)
  const existingFaculties = [
    { value: 'faculty1', label: 'Faculty 1' },
    { value: 'faculty2', label: 'Faculty 2' },
  ];

  useEffect(() => {
    // Set initial entries when the component mounts
    setEntries(initialEntries);
  }, []);

  const handleAddButtonClick = () => {
    setShowModal(true);
    setEditIndex(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOption(null);
    setSelectedFaculty(null);
    setNewItemName('');
    setDeansEmail('');
    setHallAdminEmail('');
    setEmailError('');
  };

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddItem = () => {
    // Validate email fields
    if (selectedOption?.value === 'faculty' && !validateEmail(deansEmail)) {
      setEmailError('Invalid Dean\'s email');
      return;
    }

    if (selectedOption.value === 'department' && !validateEmail(deansEmail)) {
      setEmailError('Invalid Dean\'s email');
      return;
    }

    if (selectedOption?.value === 'hall' && !validateEmail(hallAdminEmail)) {
      setEmailError('Invalid Hall Admin email');
      return;
    }

    // Handle adding or editing item logic here based on selectedOption, selectedFaculty, deansEmail, and hallAdminEmail
    const newItem = {
      type: selectedOption?.value,
      name: newItemName,
      faculty: selectedFaculty?.value || 'None',
      deansEmail,
      hallAdminEmail,
    };

    if (editIndex !== null) {
      // Editing an existing item
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = newItem;
      setEntries(updatedEntries);
    } else {
      // Adding a new item
      setEntries([...entries, newItem]);
    }

    // Close the modal
    handleModalClose();
  };

  const handleEditItem = (index) => {
    // Set modal values for editing
    const selectedItem = entries[index];
    setSelectedOption({ value: selectedItem.type, label: selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1) });
    setSelectedFaculty(existingFaculties.find(faculty => faculty.value === selectedItem.faculty) || null);
    setNewItemName(selectedItem.name);
    setDeansEmail(selectedItem.deansEmail);
    setHallAdminEmail(selectedItem.hallAdminEmail);
    setEditIndex(index);

    // Open the modal
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    // Show confirmation modal
    setEditIndex(index);
    setConfirmationModal(true);
  };

  const confirmDelete = () => {
    // Delete the item
    const updatedEntries = [...entries];
    updatedEntries.splice(editIndex, 1);
    setEntries(updatedEntries);

    // Close the confirmation modal
    setConfirmationModal(false);
  };

  const closeConfirmationModal = () => {
    // Close the confirmation modal
    setConfirmationModal(false);
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
        <Button colorScheme="yellow" onClick={handleAddButtonClick} mt={4}>
          Click to Add Department/Hall/Faculty
        </Button>

        {/* Modal for Adding/Editing Hall/Department/Faculty */}
        <Modal isOpen={showModal} onClose={handleModalClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editIndex !== null ? 'Edit' : 'Add'} {selectedOption ? selectedOption.label : ''}</ModalHeader>
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
                      <FormControl id="deansEmail" isRequired>
                        <FormLabel>Dean's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter Dean's Email"
                          value={deansEmail}
                          onChange={(e) => setDeansEmail(e.target.value)}
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
                      <FormControl id="deansEmail" isRequired>
                        <FormLabel>Dean's Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="Enter Dean's Email"
                          value={deansEmail}
                          onChange={(e) => setDeansEmail(e.target.value)}
                        />
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      </FormControl>
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
              <Button bg="#ce7348" mr={3} onClick={handleAddItem}>
                {editIndex !== null ? 'Update' : 'Add'}
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
              <Th>Dean's Email</Th>
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
                <Td>{entry.deansEmail}</Td>
                <Td>{entry.hallAdminEmail}</Td>
                <Td>
                  <Button colorScheme="yellow" size="sm" onClick={() => handleEditItem(index)}>
                    Edit
                  </Button>
                  <Button bg="#ce7348" size="sm" ml={2} onClick={() => handleDeleteItem(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Confirmation Modal */}
        <Modal isOpen={confirmationModal} onClose={closeConfirmationModal} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this entry?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" mr={3} onClick={confirmDelete}>
                Yes
              </Button>
              <Button  bg="#ce7348" onClick={closeConfirmationModal}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
