import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLogin from './components/EnhancedLogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import ElectionCommitteeDashboard from './components/maincontent/ElectionCommitteeDashboard';
import Footer from './components/Footer';
import { ChakraProvider, ColorModeProvider, Button, useColorMode, Flex, Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './Redux/store';

// Component to toggle dark mode
function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} position="fixed" m={4} zIndex={10}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}

function App() {
  const { colorMode } = useColorMode();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Router>
            <Flex direction="column" minHeight="100vh">
              <Box flex="1">
                <Routes>
                  {/* Define your routes */}
                  <Route path="/login" element={<EnhancedLogin />} />
                  <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                  <Route path="/ElectionCommittee-dashboard/*" element={<ElectionCommitteeDashboard />} />
                  <Route path='/student-dashboard/*' element={<StudentDashboard />} />
                  {/* Redirect root to /admin-dashboard */}
                  <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
                </Routes>
              </Box>
              {/* Render DarkModeToggle only if not on the "/login" page */}
              {/* {!isLoginPage && <DarkModeToggle />} */}
              <Footer colorMode={colorMode} />
            </Flex>
          </Router>
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
