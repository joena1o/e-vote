import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const FullHeightContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabsContainer = styled.div`
  text-align: center;
  width: 80%; /* Adjust the width as needed */
  max-width: 1200px; /* Add a maximum width to limit content size */
`;

const StyledTabList = styled(TabList)`
  position: relative;
`;

const StyledTab = styled(Tab)`
  position: relative;
  cursor: pointer;
  padding: 10px 20px;
  user-select: none;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: #007bff; /* Color of the indicator */
    transition: width 0.3s ease; /* Adjust the animation duration and easing */
  }

  &.react-tabs__tab--selected:before {
    width: 100%;
  }
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
        <StyledTabList>
          <StyledTab>Create Election</StyledTab>
          <StyledTab>Election List</StyledTab>
        </StyledTabList>

        <FullScreenTabPanel>
          <CreateElections />
        </FullScreenTabPanel>
        <FullScreenTabPanel>
          <ElectionList />
        </FullScreenTabPanel>
      </TabsContainer>
    </FullHeightContainer>
  );
};

export default ManageElections;
