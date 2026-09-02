import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../features/auth/hooks/useAuth.js';

/**
 * ProtectedRoute Guard
 * Restricts access to authenticated users only.
 * Redirects unauthenticated users to /login.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="veloop-auth-wrapper">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * PublicRoute Guard
 * For guest-only routes like /login and /register.
 * Redirects logged-in users to /giveaway.
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="veloop-auth-wrapper">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/giveaway" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
