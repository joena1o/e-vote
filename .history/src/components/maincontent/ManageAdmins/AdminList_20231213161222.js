import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Button,
  Box,
  Center, // Import Center
} from '@chakra-ui/react';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    electionType: null,
    hodEmail: '',
    hallAdminEmail: '',
    // Add more positions as needed
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-api-endpoint-for-data');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

    try {
      // Send the formData to the server to save in the database
      const response = await fetch('your-api-endpoint-for-saving-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data saved successfully!');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Center>
      <Box
        mt={8}
        boxShadow="rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
        p={8}
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
              required
            />
            <FormHelperText>Select the type of election.</FormHelperText>
          </FormControl>
          <FormControl>
            {formData.electionType?.value === 'senateDepartment' ||
            formData.electionType?.value === 'senateHall' ? (
              <>
                <FormLabel>Head of Department (HOD) Email:</FormLabel>
                <Input
                  type="email"
                  value={formData.hodEmail}
                  onChange={(e) =>
                    handleInputChange('hodEmail', e.target.value)
                  }
                  required
                />
                <FormHelperText>
                  Enter the email address of the Head of Department.
                </FormHelperText>
              </>
            ) : null}
          </FormControl>
          <FormControl>
            {formData.electionType?.value === 'senateHall' ? (
              <>
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
              </>
            ) : null}
          </FormControl>
          {/* Add more FormControl components for other positions */}
          <Button type="submit" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default AdminForm;
