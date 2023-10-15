import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end; /* Align to the right */
  height: 100vh;
  padding-right: 80px; /* Adjust the padding as needed to move it more to the right */
`;

const TabsContainer = styled.div`
  text-align: center;
  margin-left: auto; /* Move the TabsContainer to the right */
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
