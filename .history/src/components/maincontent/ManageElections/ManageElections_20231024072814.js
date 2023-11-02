import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Flex, Heading, Icon } from '@chakra-ui/react';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';
import { FaPlus, FaList } from 'react-icons/fa'; // Using react-icons for Font Awesome icons

const ManageElections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" align="center" w="100%" h="100%">
      <Heading mb={4}>Manage Elections</Heading>
      <Box w="40%" maxW="500px">
        <Tabs index={activeTab} onChange={handleTabChange} isLazy>
          <TabList justifyContent="center">
            <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
              <Icon as={FaPlus} mr={2} />
              Create Election
            </Tab>
            <Tab fontSize="sm" px={4} py={2} _selected={{ borderBottom: '2px solid', borderColor: 'yellow.500', color: 'yellow.500' }}>
              <Icon as={FaList} mr={2} />
              Election List
            </Tab>
          </TabList>
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
