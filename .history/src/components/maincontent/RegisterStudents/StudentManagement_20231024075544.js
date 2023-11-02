import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading } from '@chakra-ui/react';
import ManageStudents from './ManageStudents';
import RegisterStudents from './RegisterStudents';

const StudentManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" align="center" w="100%" h="100%" justifyContent="center">
      <Heading mb={4}>Student Management</Heading>
      <Box w="40%" maxW="500px">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <TabList display="inline-flex" justifyContent="center" mx="auto" w="fit-content">
            <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500' }}>
              Manage Students
            </Tab>
            <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500' }}>
              Register Students
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ManageStudents />
            </TabPanel>
            <TabPanel>
              <RegisterStudents />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default StudentManagement;
