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
    <Flex direction="column" align="center" w="100%" h="100vh"> {/* Set height to 100vh for full screen */}

      <Box w="100%" maxW="100%">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <TabList display="flex" justifyContent="center" mx="auto" borderBottom="none">
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
            
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default StudentManagement;
