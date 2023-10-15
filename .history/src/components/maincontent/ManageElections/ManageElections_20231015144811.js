import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons

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
  width: 100%; /* Set to 100% for a full-width navbar */
  max-width: 1200px;
  flex: 1;
  display: flex;
  justify-content: center; /* Center the tabs horizontally */
`;

const StyledTab = styled(Tab)`
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }

  &.react-tabs__tab--selected {
    background-color: #fff;
    border: 1px solid #007bff;
    border-radius: 5px 5px 0 0;
  }
`;

const IconWrapper = styled.div`
  margin-right: 5px;
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
          <StyledTab>
            <IconWrapper>
              <FontAwesomeIcon icon={faPlus} />
            </IconWrapper>
            Create Election
          </StyledTab>
          <StyledTab>
            <IconWrapper>
              <FontAwesomeIcon icon={faList} />
            </IconWrapper>
            Election List
          </StyledTab>
        </Tabs>
      </TabsContainer>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabPanel>
          <CreateElections />
        </TabPanel>
        <TabPanel>
          <ElectionList />
        </TabPanel>
      </Tabs>
    </FullHeightContainer>
  );
};

export default ManageElections;
