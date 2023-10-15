import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const FullHeightContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabsContainer = styled.div`
  text-align: center;
  width: 80%; /* Adjust the width as needed */
`;

const FullScreenTabPanel = styled(TabPanel)`
  flex: 1;
`;

// Add a custom style for the TabList to make tabs larger
const CustomTabList = styled(TabList)`
  display: flex;
  justify-content: space-between;
  padding: 10px; /* Adjust the padding to increase tab size */
`;

const CustomTab = styled(Tab)`
  flex: 1;
  padding: 10px; /* Adjust the padding to increase tab size */
  cursor: pointer;
  text-align: center;
  background-color: #f0f0f0; /* Add a background color for tabs */
  border: 1px solid #ccc; /* Add a border for tabs */
  border-radius: 5px; /* Add border-radius for tabs */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0; /* Change background color on hover */
  }
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
          <CustomTabList>
            <CustomTab>Create Election</CustomTab>
            <CustomTab>Election List</CustomTab>
          </CustomTabList>

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
