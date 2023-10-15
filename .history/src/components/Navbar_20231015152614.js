import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CreateElections from './maincontent/ManageElections/CreateElection';
import ElectionList from './maincontent/ManageElections/ElectionList';
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
  width: 100%;
  max-width: 1200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTab = styled(Tab)`
  padding: 10px 20px;
  color: #333;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out;

  &.Mui-selected {
    background-color: linear-gradient(to right, #ce7348, #9a552e);
    color: #fff;
    border-radius: 5px 5px 0 0;
  }

  &:hover {
    background-color: linear-gradient(to right, #ce7348, #9a552e);
  }
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <FullHeightContainer>
      <h1>Manage Elections</h1>
      <TabsContainer>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <StyledTab label="Create Election" icon={<FontAwesomeIcon icon={faPlus} />} />
          <StyledTab label="Election List" icon={<FontAwesomeIcon icon={faList} />} />
        </Tabs>
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography>
              <CreateElections />
            </Typography>
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography>
              <ElectionList />
            </Typography>
          </Box>
        )}
      </TabsContainer>
    </FullHeightContainer>
  );
};

export default ManageElections;
