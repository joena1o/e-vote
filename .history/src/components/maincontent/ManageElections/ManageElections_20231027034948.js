import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading } from '@chakra-ui/react';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" align="center" w="100vw" h="100vh" p={4}>
      <Box w="100%" h="100%" maxW="full">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <Flex justifyContent="center" w="100%">
            <TabList display="inline-flex">
              <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
                Create Election
              </Tab>
              <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
                Position
              </Tab>
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel>
              <CreateElections />
            </TabPanel>
            <TabPanel>
              <ElectionList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default ManageElections;
