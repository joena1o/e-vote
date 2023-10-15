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
  width: 100%;
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
  border: 1px solid #ddd; /* Add a border to separate tab panels */
  padding: 20px; /* Add some padding to the tab panels */
  background-color: #fff; /* Set a white background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

const StyledTab = styled(Tab)`
  padding: 10px 20px; /* Adjust tab padding */
  background-color: #f5f5f5; /* Set a light gray background color for tabs */
  color: #333; /* Set text color */
  border: 1px solid #ddd; /* Add a border to tabs */
  cursor: pointer; /* Change cursor on hover */
  margin: 0 5px; /* Add some margin between tabs */
  border-radius: 5px; /* Add rounded corners to tabs */
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
            <StyledTab>Create Election</StyledTab>
            <StyledTab>Election List</StyledTab>
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
