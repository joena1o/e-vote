import React, { useState } from 'react';
import { API } from 'aws-amplify';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  Box,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

export default function ElectionCreationForm() {
  const [formData, setFormData] = useState({
    positions: '',
    guidelines: '',
    students: '',
    nominationStart: '',
    nominationEnd: '',
    electionStart: '',
    electionEnd: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    // Add your validation logic here
    // Return true if valid, false if invalid
    // Example: Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== '');
    if (!allFieldsFilled) {
      setError('All fields are required!');
      return false;
    }
    // Additional validation checks can be added here...
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      // Add your API call logic here. E.g., API calls, form validation
      const response = await API.post('apiName', '/path', { body: formData });
      console.log('API response:', response);
      // Handle response, e.g., navigate to another page, show a success message, etc.
    } catch (error) {
      console.error('API call error:', error);
      setError('An error occurred while creating the election.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      as="form" 
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Election Creation
        </Heading>
        {error && (
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {/* Form fields go here */}
        {/* Example: */}
        <FormControl id="positions" isRequired>
          <FormLabel>Positions</FormLabel>
          <Input
            name="positions"
            value={formData.positions}
            onChange={handleChange}
            placeholder="e.g., President, Secretary"
          />
        </FormControl>
        {/* Add other form fields similarly */}
        <Button
          type="submit"
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={loading}
        >
          Create Election
        </Button>
      </Stack>
    </Flex>
  );
}
