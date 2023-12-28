import React, { useState } from 'react';
import { ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select } from "@chakra-ui/react";
import ReactSelect from 'react-select';

const AddItemButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [addType, setAddType] = useState(null);
  const [newItemName, setNewItemName] = useState('');

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
      <div>
        {/* Add Button */}
        <Button colorScheme="blue" onClick={() => handleAddButtonClick('faculty')} mt={4}>
          Add Hall/Department/Faculty
        </Button>

        {/* Modal for Adding Hall/Department/Faculty */}
        <Modal isOpen={showModal} onClose={handleModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add {addType}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Dropdown to select item type */}
              <Select mb={4} value={addType} onChange={(e) => setAddType(e.target.value)}>
                <option value="faculty">Faculty</option>
                <option value="department">Department</option>
                <option value="hall">Hall</option>
              </Select>

              {addType === 'faculty' && (
                <div>
                  <label>Faculty Name</label>
                  <input
                    type="text"
                    placeholder="Enter Faculty Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
              )}

              {addType === 'department' && (
                <div>
                  <label>Select Faculty</label>
                  <ReactSelect
                    options={[]}
                    onChange={(selectedOption) => console.log(selectedOption)}
                  />
                  <label>Department Name</label>
                  <input
                    type="text"
                    placeholder="Enter Department Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
              )}

              {addType === 'hall' && (
                <div>
                  <label>Hall Name</label>
                  <input
                    type="text"
                    placeholder="Enter Hall Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
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
