import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLogin from './components/EnhancedLogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import { ChakraProvider, ColorModeProvider, Button, useColorMode } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import ElectionCommitteeDashboard from './components/maincontent/ElectionCommitteeDashboard';
import { useMediaQuery } from 'react-responsive';
import GridLayout from 'react-grid-layout';

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
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Router>
            {isDesktopOrLaptop && (
              // Render for desktop or laptop view
              <Routes>
                {/* Define your routes */}
                <Route path="/login" element={<EnhancedLogin />} />
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                <Route path="/ElectionCommittee-dashboard/*" element={<ElectionCommitteeDashboard />} />
                <Route path='/student-dashboard/*' element={<StudentDashboard />} />
                {/* Redirect root to /admin-dashboard */}
                <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
              </Routes>
            )}
            {isTabletOrMobile && (
              // Render for tablet or mobile view
              <GridLayout className="layout" cols={4} rowHeight={30} width={1200}>
                <div key="a">
                  <Route path="/login" element={<EnhancedLogin />} />
                </div>
                <div key="b">
                  <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                </div>
                <div key="c">
                  <Route path="/ElectionCommittee-dashboard/*" element={<ElectionCommitteeDashboard />} />
                </div>
                <div key="d">
                  <Route path='/student-dashboard/*' element={<StudentDashboard />} />
                </div>
                {/* Redirect root to /admin-dashboard */}
                <div key="e">
                  <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
                </div>
              </GridLayout>
            )}
          </Router>
          {/* Render DarkModeToggle only if not on the "/login" page */}
          {/* {!isLoginPage && <DarkModeToggle />} */}
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
