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

const ContentContainer = styled.div`
  flex: 1; /* Fill the remaining vertical space */
  display: flex;
  flex-direction: column;
`;

const TabsContainer = styled.div`
  text-align: center;
  background-color: #fff; /* Add a background color if needed */
`;

const FullScreenTabPanel = styled(TabPanel)`
  flex: 1;
  margin-top: 20px; /* Add margin to separate tabs from content */
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
      <ContentContainer>
        <FullScreenTabPanel>
          <CreateElections />
        </FullScreenTabPanel>
        <FullScreenTabPanel>
          <ElectionList />
        </FullScreenTabPanel>
      </ContentContainer>
    </FullHeightContainer>
  );
};

export default ManageElections;
