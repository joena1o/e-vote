import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [hallAdminEmail, setHallAdminEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Static list of faculties (replace with dynamic fetching in a real application)
  const existingFaculties = [
    { value: 'faculty1', label: 'Faculty 1' },
    { value: 'faculty2', label: 'Faculty 2' },
  ];

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
    console.log('Adding new', selectedOption?.value, 'with name:', newItemName, 'under faculty:', selectedFaculty?.value);
    console.log('HOD Email:', hodEmail);
    console.log('Hall Admin Email:', hallAdminEmail);

    // Close the modal
    handleModalClose();
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
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
