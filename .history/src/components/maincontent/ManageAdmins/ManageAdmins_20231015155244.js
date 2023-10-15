import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import AddAdmin from './AddAdmin';
import AdminList from './AdminList';

function ManageAdmins() {
  return (
    <div>
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
    </div>
  );
}

export default ManageAdmins;
