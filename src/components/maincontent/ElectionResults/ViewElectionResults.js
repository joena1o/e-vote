import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading } from '@chakra-ui/react';
import ViewResults from './ViewResults';
import ElectionVotesLog from './report';

const ElectionDashboard = () => {
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
                View Election Results
              </Tab>
              <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
                View Election Votes Log
              </Tab>
            </TabList>
          </Flex>
          <TabPanels>
            <TabPanel>
              <ViewResults />
            </TabPanel>
            <TabPanel>
              <ElectionVotesLog />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default ElectionDashboard;

