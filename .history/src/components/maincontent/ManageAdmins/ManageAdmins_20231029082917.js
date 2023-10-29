import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading } from '@chakra-ui/react';
import AddAdmin from './AddAdmin';
import AdminList from './AdminList';

const ManageAdmins = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" align="center" w="100%" h="100%">
      <Box w="100%" maxW="400px" display="flex" flexDirection="column" alignItems="center">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <TabList display="inline-flex" justifyContent="center" mx="auto">
          <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
             Add Admin
          </Tab>
          <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
             Admin List
          </Tab>

          </TabList>
          <TabPanels>
            <TabPanel>
              <AddAdmin />
            </TabPanel>
            <TabPanel>
              <AdminList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default ManageAdmins;
