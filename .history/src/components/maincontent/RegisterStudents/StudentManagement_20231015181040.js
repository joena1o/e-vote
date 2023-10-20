import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import styles for react-tabs
import styled from 'styled-components';
import ManageStudents from './ManageStudents';
import RegisterStudents from './RegisterStudents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons

const FullHeightContainer = styled.div`
  height: 100%;
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

  &:hover {
    background-color: #e0e0e0;
  }

  &.react-tabs__tab--selected {
    background-color: #fff;
    border: none; /* Remove the border */
    border-radius: 5px 5px 0 0;
  }
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

const StudentManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <FullHeightContainer>
      <h1>Student Management</h1>
      <TabsContainer>
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabList style={{ display: 'flex', justifyContent: 'center' }}>
            <StyledTab>
              <IconWrapper>
                <FontAwesomeIcon icon={faUser} />
              </IconWrapper>
              Manage Students
            </StyledTab>
            <StyledTab>
              <IconWrapper>
                <FontAwesomeIcon icon={faUserPlus} />
              </IconWrapper>
              Register Students
            </StyledTab>
          </TabList>
        </Tabs>
        <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
          <TabPanel>
            <ManageStudents />
          </TabPanel>
          <TabPanel>
            <RegisterStudents />
          </TabPanel>
        </Tabs>
      </TabsContainer>
    </FullHeightContainer>
  );
};

export default StudentManagement;
