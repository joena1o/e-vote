import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading } from '@chakra-ui/react';
import AddAdmin from './AddAdmin';
import AdminList from './AdminList';
import { FaUserPlus, FaList } from 'react-icons/fa'; // Using react-icons for Font Awesome icons

const ManageAdmins = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" align="center" w="100%" h="100%">
      <Heading mb={4}>Manage Admins</Heading>
      <Box w="100%" maxW="800px">
        <Tabs index={activeTab} onChange={handleTabChange} variant="enclosed">
          <TabList justifyContent="center" spacing={4} borderBottom="none">
            <Tab px={4} py={2}>
              <FaUserPlus mr={2} />
              Add Admin
            </Tab>
            <Tab px={4} py={2}>
              <FaList mr={2} />
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
