import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components'; // Import styled-components
import AddAdmin from './AddAdmin';
import AdminList from './AdminList';

// Define a styled container with 100vh height
const FullHeightContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

function ManageAdmins() {
  return (
    <FullHeightContainer>
      <h2>Manage Admins</h2>
      <Tabs>
        <TabList>
          <Tab>Add Admin</Tab>
          <Tab>Admin List</Tab>
        </TabList>
        <TabPanel>
          <AddAdmin />
        </TabPanel>
        <TabPanel>
          <AdminList />
        </TabPanel>
      </Tabs>
    </FullHeightContainer>
  );
}

export default ManageAdmins;
