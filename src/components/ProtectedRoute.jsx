import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading, getPortalRoute } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <div className="w-4 h-4 border-2 border-olive-700 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating festival pass...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to the portal matching their actual role
    return <Navigate to={getPortalRoute(user?.role)} replace />;
  }

  return children;
};
