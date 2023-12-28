import React, { useState, useEffect } from 'react';
import Select from 'react-select';

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
    <div>
      <h1>Admin Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Election Type:
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
        </label>
        <br />
        {formData.electionType?.value === 'senateDepartment' ||
        formData.electionType?.value === 'senateHall' ? (
          <>
            <label>
              Head of Department (HOD) Email:
              <input
                type="email"
                value={formData.hodEmail}
                onChange={(e) => handleInputChange('hodEmail', e.target.value)}
                required
              />
            </label>
            <br />
          </>
        ) : null}
        {formData.electionType?.value === 'senateHall' ? (
          <>
            <label>
              Hall Admin Email:
              <input
                type="email"
                value={formData.hallAdminEmail}
                onChange={(e) =>
                  handleInputChange('hallAdminEmail', e.target.value)
                }
                required
              />
            </label>
            <br />
          </>
        ) : null}
        {/* Add more input fields for other positions */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
