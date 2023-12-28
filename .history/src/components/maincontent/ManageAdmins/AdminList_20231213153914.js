import React, { useState, useEffect } from 'react';

const AdminList = () => {
  const [positionMapping, setPositionMapping] = useState({
    president: '',
    vicePresident: '',
    // Add more positions as needed
  });

  useEffect(() => {
    const fetchPositionMapping = async () => {
      try {
        const response = await fetch('your-api-endpoint-for-position-mapping');
        const data = await response.json();
        setPositionMapping(data);
      } catch (error) {
        console.error('Error fetching position mapping:', error);
      }
    };

    fetchPositionMapping();
  }, []);

  const handleInputChange = (position, email) => {
    setPositionMapping((prevMapping) => ({ ...prevMapping, [position]: email }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the positionMapping to the server to save in the database
      const response = await fetch('your-api-endpoint-for-saving-mapping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(positionMapping),
      });

      if (response.ok) {
        console.log('Mapping saved successfully!');
      } else {
        console.error('Error saving mapping:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving mapping:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          President:
          <input
            type="email"
            value={positionMapping.president}
            onChange={(e) => handleInputChange('president', e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Vice President:
          <input
            type="email"
            value={positionMapping.vicePresident}
            onChange={(e) => handleInputChange('vicePresident', e.target.value)}
            required
          />
        </label>
        <br />
        {/* Add more input fields for other positions */}
        <button type="submit">Save Mapping</button>
      </form>
    </div>
  );
};

export default AdminList;
