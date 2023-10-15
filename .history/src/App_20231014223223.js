import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLogin from './components/EnhancedLogin';
import AdminDashboard from './components/AdminDashboard';
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
            <Routes>
              {/* Define your routes */}
              {/* Remove DarkModeToggle from the EnhancedLogin route */}
              <Route path="/login" element={<EnhancedLogin />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              {/* Redirect root to /admin-dashboard */}
              <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
            </Routes>
          </Router>
          {/* Keep DarkModeToggle outside of EnhancedLogin route */}
          <DarkModeToggle />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
