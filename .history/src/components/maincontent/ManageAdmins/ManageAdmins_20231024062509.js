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
      <Heading mb={4}>Manage Admins</Heading>
      <Box w="40%" maxW="500px">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <TabList justifyContent="center">
            <Tab 
              fontSize="sm" 
              px={4} 
              py={2}
              _selected={{ 
                position: "relative",
                "::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "currentColor",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "fit-content"
                }
              }}
            >
              Add Admin
            </Tab>
            <Tab 
              fontSize="sm" 
              px={4} 
              py={2}
              _selected={{ 
                position: "relative",
                "::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "currentColor",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "fit-content"
                }
              }}
            >
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
