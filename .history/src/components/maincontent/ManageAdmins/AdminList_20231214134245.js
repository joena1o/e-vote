import React, { useState } from 'react';
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Select from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [hallAdminEmail, setHallAdminEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [entries, setEntries] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Static list of faculties (replace with dynamic fetching in a real application)
  const existingFaculties = [
    { value: 'faculty1', label: 'Faculty 1' },
    { value: 'faculty2', label: 'Faculty 2' },
  ];

  const mockEntries = [
    { type: 'faculty', name: 'Faculty of Arts', faculty: 'None', hodEmail: 'hod.arts@example.com', hallAdminEmail: '' },
    { type: 'faculty', name: 'Faculty of Science', faculty: 'None', hodEmail: 'hod.science@example.com', hallAdminEmail: '' },
    { type: 'department', name: 'English Department', faculty: 'Faculty of Arts', hodEmail: 'hod.english@example.com', hallAdminEmail: '' },
    { type: 'department', name: 'Computer Science Department', faculty: 'Faculty of Science', hodEmail: 'hod.cs@example.com', hallAdminEmail: 'admin.cs@example.com' },
    { type: 'hall', name: 'Hall A', faculty: 'None', hodEmail: '', hallAdminEmail: 'admin.hallA@example.com' },
    { type: 'hall', name: 'Hall B', faculty: 'None', hodEmail: '', hallAdminEmail: 'admin.hallB@example.com' },
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
    const newItem = {
      type: selectedOption?.value,
      name: newItemName,
      faculty: selectedFaculty?.value || 'None',
      hodEmail,
      hallAdminEmail,
    };

    // Update the entries state
    setEntries([...entries, newItem]);

    // Close the modal
    handleModalClose();
  };

  const handleDeleteItem = (index) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    // Handle deleting item logic here
    const updatedEntries = [...entries];
    updatedEntries.splice(deleteIndex, 1);
    setEntries(updatedEntries);

    // Close the confirmation modal
    setDeleteIndex(null);
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

        {/* Modal for Confirming Deletion */}
        <Modal isOpen={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert status="warning">
                <AlertIcon />
                <AlertTitle mr={2}>Are you sure you want to delete?</AlertTitle>
                <AlertDescription> This action is irreversible.</AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleConfirmDelete}>Yes, Delete</Button>
              <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default AddItemButton;
