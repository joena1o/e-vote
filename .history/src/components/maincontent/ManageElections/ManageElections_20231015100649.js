import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const TabsContainer = styled.div`
  width: 80%; /* Adjust the width as needed */
  text-align: center;
`;

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <h1>Manage Elections</h1>
      <TabsContainer>
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
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
      </TabsContainer>
    </Container>
  );
};

export default ManageElections;
