import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  Input, 
  FormControl, 
  FormLabel, 
  useColorMode, 
  Box, 
  VStack, 
  Flex, 
  Text,
  Icon,
  chakra
} from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';

const CreateElection = () => {
  const [electionType, setElectionType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { colorMode } = useColorMode();

  const formik = useFormik({
    initialValues: {
      electionTitle: '',
      electionType: '',
      name: '',
      startDate: '',
      position: '',
      committeeMembers: [],
    },
    validationSchema: Yup.object({
      electionTitle: Yup.string().required('Required'),
      electionType: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      position: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      // TODO: Your logic to add the election using AWS Amplify or other methods
      // For demonstration, I'll just show the modal
      setModalIsOpen(true);
    },
  });

  const electionTypeOptions = [
    { value: 'general', label: 'General' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'department', label: 'Department' }
  ];
  
  const students = [
    { value: 'Pascal@example.com', label: 'Prisca Ahmadu' },
    { value: 'Prisca@example.com', label: 'Paul Ahmadu' },
  ];

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)}>Open Election Form</Button>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Election</ModalHeader>
          <ModalCloseButton />
          <ModalBody as="form" onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>

              <Flex justify="space-between" width="100%">
                <FormControl id="electionTitle" width="48%">
                  <FormLabel><Icon as={FiType} /> Title:</FormLabel>
                  <Input
                    name="electionTitle"
                    type="text"
                    placeholder="Enter Election Title"
                    onChange={formik.handleChange}
                    value={formik.values.electionTitle}
                  />
                  {formik.errors.electionTitle && <Text color="red.500">{formik.errors.electionTitle}</Text>}
                </FormControl>

                <FormControl id="electionType" width="48%">
                  <FormLabel><Icon as={FiFileText} /> Type:</FormLabel>
                  <Box width="100%">
                    <chakra.select
                      name="electionType"
                      onChange={(e) => {
                        formik.setFieldValue("electionType", e.target.value);
                        setElectionType(e.target.value);
                      }}
                      value={formik.values.electionType}
                      placeholder="Select Type"
                    >
                      {electionTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </chakra.select>
                  </Box>
                  {formik.errors.electionType && <Text color="red.500">{formik.errors.electionType}</Text>}
                </FormControl>
              </Flex>

              {(electionType === 'faculty' || electionType === 'department') && (
                <FormControl id="name">
                  <FormLabel><Icon as={FiClipboard} /> {electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name && <Text color="red.500">{formik.errors.name}</Text>}
                </FormControl>
              )}

              <Flex justify="space-between" width="100%">
                <FormControl id="startDate" width="48%">
                  <FormLabel><Icon as={FiCalendar} /> Start Date:</FormLabel>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  />
                  {formik.errors.startDate && <Text color="red.500">{formik.errors.startDate}</Text>}
                </FormControl>

                <FormControl id="position" width="48%">
                  <FormLabel><Icon as={FiUsers} /> Position:</FormLabel>
                  <Input
                    name="position"
                    type="text"
                    placeholder="Enter Position"
                    onChange={formik.handleChange}
                    value={formik.values.position}
                  />
                  {formik.errors.position && <Text color="red.500">{formik.errors.position}</Text>}
                </FormControl>
              </Flex>

              <FormControl id="committeeMembers">
                <FormLabel><Icon as={FiUserCheck} /> Committee Members:</FormLabel>
                <Box width="100%">
                  <chakra.select
                    multiple
                    name="committeeMembers"
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      formik.setFieldValue("committeeMembers", selectedOptions);
                    }}
                    value={formik.values.committeeMembers}
                  >
                    {students.map(student => (
                      <option key={student.value} value={student.value}>
                        {student.label}
                      </option>
                    ))}
                  </chakra.select>
                </Box>
              </FormControl>

            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Create Election
            </Button>
            <Button variant="ghost" onClick={() => setModalIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateElection;
