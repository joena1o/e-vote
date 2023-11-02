import React from 'react';
import { Tabs, TabList, Tab, TabPanel, Box, ChakraProvider } from '@chakra-ui/react';
import ViewResults from './ViewResults';
import ElectionVotesLog from './report'; 

const ElectionDashboard = () => {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab>View Election Results</Tab>
            <Tab>View Election Votes Log</Tab>
          </TabList>
          <TabPanel>
            <ViewResults /> 
          </TabPanel>
          <TabPanel>
            <ElectionVotesLog /> 
          </TabPanel>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default ElectionDashboard;
