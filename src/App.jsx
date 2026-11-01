import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FestivalProvider } from './context/FestivalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { TeamsDirectoryPage } from './pages/TeamsDirectoryPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPortal } from './pages/portals/AdminPortal';
import { EventHeadPortal } from './pages/portals/EventHeadPortal';
import { VolunteerPortal } from './pages/portals/VolunteerPortal';

// Component to redirect /portal to user's dedicated dashboard
const PortalRedirect = () => {
  const { user, isAuthenticated, getPortalRoute } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <Navigate to={getPortalRoute(user?.role)} replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FestivalProvider>
          <div className="flex flex-col min-h-screen bg-canvas text-text-main font-sans selection:bg-olive-200 selection:text-olive-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/teams" element={<TeamsDirectoryPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Dynamic RBAC Router */}
                <Route path="/portal" element={<PortalRedirect />} />

                {/* Protected Role-Based Portals */}
                <Route 
                  path="/portal/admin" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminPortal />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/portal/lead" 
                  element={
                    <ProtectedRoute allowedRoles={['event_head', 'admin']}>
                      <EventHeadPortal />
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/portal/volunteer" 
                  element={
                    <ProtectedRoute allowedRoles={['volunteer', 'event_head', 'admin']}>
                      <VolunteerPortal />
                    </ProtectedRoute>
                  } 
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FestivalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
