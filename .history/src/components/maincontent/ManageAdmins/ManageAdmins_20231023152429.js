import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Icon, Flex, Heading } from '@chakra-ui/react';
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
      <Box w="100%" maxW="1200px">
        <Tabs index={activeTab} onChange={handleTabChange} variant="enclosed">
          <TabList justifyContent="center" spacing={4}> {/* Added spacing prop here */}
            <Tab>
              <Flex align="center">
                <Icon as={FaUserPlus} mr={2} />
                Add Admin
              </Flex>
            </Tab>
            <Tab>
              <Flex align="center">
                <Icon as={FaList} mr={2} />
                Admin List
              </Flex>
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
