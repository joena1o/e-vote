import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const FullHeightContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TabsContainer = styled.div`
  text-align: center;
  width: 80%;
  max-width: 1200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FullScreenTabPanel = styled(TabPanel)`
  flex: 1;
`;

const StyledTab = styled(Tab)`
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }

  &.react-tabs__tab--selected {
    background-color: #fff; /* Set background color for the selected tab */
    border-bottom: 2px solid #007bff; /* Add an indicator for the selected tab */
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
