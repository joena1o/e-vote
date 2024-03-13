import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLogin from './components/EnhancedLogin';
import StudentDashboard from './components/StudentDashboard';
import { ChakraProvider, ColorModeProvider, Button, useColorMode } from '@chakra-ui/react';
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
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeProvider options={{ useSystemColorMode: true }}>
          <Router>
            <div>
              <Routes>
                {/* Define your routes */}
                <Route path="/login" element={<EnhancedLogin />} />
                <Route path='/student-dashboard/*' element={<StudentDashboard />} />
                {/* Redirect root to /admin-dashboard */}
                <Route path="/" element={<Navigate to="/student-dashboard" replace />} />
              </Routes>
            </div>
          </Router>
          {/* Render DarkModeToggle */}
          {/* {!isLoginPage && <DarkModeToggle />} */}
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
