import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>Manage Elections</h1>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange} style={{ flex: 1 }}>
        <TabList>
          <Tab>Create Election</Tab>
          <Tab>Election List</Tab>
        </TabList>

        <TabPanel>
          <CreateElections />
        </TabPanel>
        <TabPanel>
          <ElectionList />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ManageElections;
