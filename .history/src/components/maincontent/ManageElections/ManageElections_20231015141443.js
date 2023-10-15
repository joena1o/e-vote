import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const FullHeightContainer = styled.div`
  height: 100vh; /* Set the height to 100vh to occupy the full viewport height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align content at the top */
  align-items: center;
`;

const TabsContainer = styled.div`
  text-align: center;
  width: 80%; /* Adjust the width as needed */
  max-width: 1200px; /* Add a maximum width to limit content size */
  flex: 1; /* Fill the remaining vertical space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align content at the top */
`;

const FullScreenTabPanel = styled(TabPanel)`
  flex: 1;
`;

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <FullHeightContainer>
      <h1>Manage Elections</h1>
      <TabsContainer>
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabList>
            <Tab>Create Election</Tab>
            <Tab>Election List</Tab>
          </TabList>

          <FullScreenTabPanel>
            <CreateElections />
          </FullScreenTabPanel>
          <FullScreenTabPanel>
            <ElectionList />
          </FullScreenTabPanel>
        </Tabs>
      </TabsContainer>
    </FullHeightContainer>
  );
};

export default ManageElections;
