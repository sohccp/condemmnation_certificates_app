import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout components
import Layout from './components/layout/Layout';

// Auth components
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Page components
import Dashboard from './pages/Dashboard';
import InstrumentsList from './pages/instruments/InstrumentsList';
import InstrumentDetails from './pages/instruments/InstrumentDetails';
import CertificatesList from './pages/certificates/CertificatesList';
import CertificateDetails from './pages/certificates/CertificateDetails';
import NewCertificate from './pages/certificates/NewCertificate';
import Reports from './pages/reports/Reports';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // In a real app, this would verify credentials with the backend
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/instruments" element={<InstrumentsList />} />
              <Route path="/instruments/:id" element={<InstrumentDetails />} />
              <Route path="/certificates" element={<CertificatesList />} />
              <Route path="/certificates/new" element={<NewCertificate />} />
              <Route path="/certificates/:id" element={<CertificateDetails />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </AuthProvider>
  );
};

export default App;
