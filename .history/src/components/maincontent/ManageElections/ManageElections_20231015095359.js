import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';
import styled from 'styled-components';

// Styled components for tabs
const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomTabList = styled(TabList)`
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 10px;
`;

const CustomTab = styled(Tab)`
  padding: 10px 20px;
  margin: 0 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #fff;
    border: 2px solid #007bff;
  }

  &.react-tabs__tab--selected {
    background-color: #007bff;
    color: #fff;
    border: 2px solid #007bff;
  }
`;

// Styled component for tab panels
const CustomTabPanel = styled(TabPanel)`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <h1>Manage Elections</h1>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <CustomTabList>
          <CustomTab>Create Election</CustomTab>
          <CustomTab>Election List</CustomTab>
        </CustomTabList>

        <CustomTabPanel>
          <CreateElections />
        </CustomTabPanel>
        <CustomTabPanel>
          <ElectionList />
        </CustomTabPanel>
      </Tabs>
    </TabContainer>
  );
};

export default ManageElections;
