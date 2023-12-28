import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Box } from '@chakra-ui/react';

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
    <Box>
      <h1>Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <Box>
          <label>Election Type:</label>
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
        </Box>
        <Box>
          {formData.electionType?.value === 'senateDepartment' ||
          formData.electionType?.value === 'senateHall' ? (
            <>
              <label>Head of Department (HOD) Email:</label>
              <Input
                type="email"
                value={formData.hodEmail}
                onChange={(e) => handleInputChange('hodEmail', e.target.value)}
                required
              />
            </>
          ) : null}
        </Box>
        <Box>
          {formData.electionType?.value === 'senateHall' ? (
            <>
              <label>Hall Admin Email:</label>
              <Input
                type="email"
                value={formData.hallAdminEmail}
                onChange={(e) =>
                  handleInputChange('hallAdminEmail', e.target.value)
                }
                required
              />
            </>
          ) : null}
        </Box>
        {/* Add more input fields for other positions */}
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default AdminForm;
