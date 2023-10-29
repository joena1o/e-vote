import React, { useState } from 'react';
import Select from 'react-select';
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
  Box 
} from '@chakra-ui/react';
import { FiCalendar, FiUsers, FiFileText, FiUserCheck, FiClipboard, FiType } from 'react-icons/fi';


const selectStyles = theme => ({
  menu: base => ({
    ...base,
    backgroundColor: theme === 'dark' ? '#2c2c2c' : '#ffffff',
  }),


  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? theme === 'dark' ? '#3c3c3c' : '#e2e2e2'
      : theme === 'dark' ? '#2c2c2c' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  control: base => ({
    ...base,
    backgroundColor: theme === 'dark' ? '#3c3c3c' : '#ffffff',
    borderColor: theme === 'dark' ? '#555555' : '#ccc',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  singleValue: base => ({
    ...base,
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
  placeholder: base => ({
    ...base,
    color: theme === 'dark' ? '#ffffff' : '#000000',
  }),
});


const Form = styled.form`
  background: rgba(255,255,255,0.3);
  padding: 2em;  // Reduced from 3em
  border-radius: 0;
  backdrop-filter: blur(10px);
  max-width: 600px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;  // Reduced from 1em
  align-items: start;
  width: 100%;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ce7348;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HalfWidthField = styled(FormField)`
  width: 48%;  // slightly less than half to account for any potential margins or paddings
`;
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%; // Smaller width for responsiveness
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
`;

const CloseIcon = styled(FiX)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ce7348;
`;

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

              <Flex justify="space-between">
                <FormControl id="electionTitle" width="48%">
                  <FormLabel><FiType /> Title:</FormLabel>
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
                  <FormLabel><FiFileText /> Type:</FormLabel>
                  <Box width="100%">
                    <Select
                      name="electionType"
                      options={electionTypeOptions}
                      onChange={(option) => {
                        formik.setFieldValue("electionType", option.value);
                        setElectionType(option.value);
                      }}
                      value={electionTypeOptions.find(
                        option => option.value === formik.values.electionType
                      )}
                      placeholder="Select Type"
                      styles={selectStyles(colorMode)}
                    />
                  </Box>
                  {formik.errors.electionType && <Text color="red.500">{formik.errors.electionType}</Text>}
                </FormControl>
              </Flex>

              {(electionType === 'faculty' || electionType === 'department') && (
                <FormControl id="name">
                  <FormLabel><FiClipboard /> {electionType.charAt(0).toUpperCase() + electionType.slice(1)} Name:</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name && <Text color="red.500">{formik.errors.name}</Text>}
                </FormControl>
              )}

              <Flex justify="space-between">
                <FormControl id="startDate" width="48%">
                  <FormLabel><FiCalendar /> Start Date:</FormLabel>
                  <Input
                    name="startDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  />
                  {formik.errors.startDate && <Text color="red.500">{formik.errors.startDate}</Text>}
                </FormControl>

                <FormControl id="position" width="48%">
                  <FormLabel><FiUsers /> Position:</FormLabel>
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
                <FormLabel><FiUserCheck /> Committee Members:</FormLabel>
                <Box width="100%">
                  <Select
                    isMulti
                    options={students}
                    onChange={selectedOptions => {
                      formik.setFieldValue(
                        "committeeMembers",
                        selectedOptions.map(option => option.value)
                      );
                    }}
                    value={students.filter(student =>
                      formik.values.committeeMembers.includes(student.value)
                    )}
                    placeholder="Select members..."
                    styles={selectStyles(colorMode)}
                  />
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