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
`;

const TabsContainer = styled.div`
  text-align: center;
  width: 100%; /* Make it 100% width to span the entire screen */
  position: fixed; /* Position the tabs fixed at the top */
  top: 0; /* Place the tabs at the top of the screen */
  background-color: #fff; /* Add a background color if needed */
  z-index: 999; /* Ensure the tabs appear above other content */
`;

const FullScreenTabPanel = styled(TabPanel)`
  flex: 1;
  margin-top: 50px; /* Add some margin to push content below the tabs */
`;

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <FullHeightContainer>
      <TabsContainer>
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabList>
            <Tab>Create Election</Tab>
            <Tab>Election List</Tab>
          </TabList>
        </Tabs>
      </TabsContainer>
      <FullScreenTabPanel>
        <CreateElections />
      </FullScreenTabPanel>
      <FullScreenTabPanel>
        <ElectionList />
      </FullScreenTabPanel>
    </FullHeightContainer>
  );
};

export default ManageElections;
