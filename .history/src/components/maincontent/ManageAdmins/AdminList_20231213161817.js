import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    electionType: null,
    hodEmail: '',
    hallAdminEmail: '',
  });

  useEffect(() => {
    // Replace this with your actual data fetching logic from the API
    // For demonstration purposes, setting initial data
    setFormData({
      electionType: null,
      hodEmail: '',
      hallAdminEmail: '',
    });
  }, []);

  const electionOptions = [
    { value: 'general', label: 'General Election' },
    { value: 'senateDepartment', label: 'Senate Election (Department)' },
    { value: 'senateHall', label: 'Senate Election (Hall)' },
    { value: 'faculty', label: 'Faculty Election' },
    { value: 'departmental', label: 'Departmental Election' },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Box
      mt={8}
      boxShadow="rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
      p={8}
      textAlign="center" // Center the content
    >
      <h1>Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Election Type:</FormLabel>
          <Select
            options={electionOptions}
            value={formData.electionType}
            onChange={(selectedOption) =>
              handleInputChange('electionType', selectedOption)
            }
            isClearable
            isSearchable
            variant="filled" // Try changing the variant
            required
          />
          <FormHelperText>Select the type of election.</FormHelperText>
        </FormControl>
        {formData.electionType?.value === 'senateDepartment' ||
        formData.electionType?.value === 'senateHall' ? (
          <>
            <FormControl>
              <FormLabel>Head of Department (HOD) Email:</FormLabel>
              <Input
                type="email"
                value={formData.hodEmail}
                onChange={(e) => handleInputChange('hodEmail', e.target.value)}
                required
              />
              <FormHelperText>
                Enter the email address of the Head of Department.
              </FormHelperText>
            </FormControl>
          </>
        ) : null}
        {formData.electionType?.value === 'senateHall' ? (
          <>
            <FormControl>
              <FormLabel>Hall Admin Email:</FormLabel>
              <Input
                type="email"
                value={formData.hallAdminEmail}
                onChange={(e) =>
                  handleInputChange('hallAdminEmail', e.target.value)
                }
                required
              />
              <FormHelperText>
                Enter the email address of the Hall Admin.
              </FormHelperText>
            </FormControl>
          </>
        ) : null}
        <Button type="submit" mt={4}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AdminForm;
