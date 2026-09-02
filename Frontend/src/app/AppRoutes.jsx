import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute.jsx';
import useAuth from '../features/auth/hooks/useAuth.js';
import { FiLogOut, FiGift, FiCheck, FiShield } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

// Giveaway Dashboard for Authenticated Users
export const GiveawayDashboard = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="veloop-auth-wrapper">
      <div className="glow-orb-top-left"></div>
      <div className="glow-orb-bottom-right"></div>

      <div className="veloop-auth-card" style={{ maxWidth: '560px' }}>
        {/* Brand Header */}
        <div className="veloop-brand">
          <div className="veloop-brand-header">
            <span className="veloop-logo-icon">
              <BsStars />
            </span>
            <span className="veloop-brand-name">VELOOP</span>
          </div>
          <span className="veloop-brand-sub">REWARDS</span>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex p-3 rounded-circle mb-3"
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              border: '1px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <FiGift size={36} />
          </div>
          <h2 className="veloop-title">Exclusive Giveaways</h2>
          <p className="veloop-subtitle">
            Welcome, <strong className="text-white">{user?.fullName || user?.name || user?.username || user?.email || 'Valued Member'}</strong>! You have access to exclusive member perks.
          </p>
        </div>

        {/* Member Details */}
        <div
          className="p-3 rounded-3 mb-4"
          style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted small">Account Status</span>
            <span className="badge bg-success-subtle text-success border border-success-subtle d-flex align-items-center gap-1">
              <FiCheck size={12} /> Active Member
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="text-muted small">Connected Email</span>
            <span className="text-white small fw-medium">{user?.email || 'user@veloop.com'}</span>
          </div>
          {user?.displayId && (
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-muted small">Display ID</span>
              <span className="text-white small fw-medium">@{user.displayId}</span>
            </div>
          )}
        </div>

        {/* Sign Out Action */}
        <button
          onClick={logoutUser}
          className="veloop-btn veloop-btn-register"
          style={{ marginTop: '10px' }}
        >
          <FiLogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="veloop-trust-badges">
        <div className="veloop-trust-item">
          <FiShield className="veloop-trust-icon" />
          <span>Protected Area</span>
        </div>
      </div>
    </div>
  );
};

// createBrowserRouter router definition
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/giveaway" replace />,
  },
  // Public Guest Routes (redirect to /giveaway if already logged in)
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  // Protected Routes (redirect to /login if unauthenticated)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/giveaway',
        element: <GiveawayDashboard />,
      },
      {
        path: '/dashboard',
        element: <GiveawayDashboard />,
      },
    ],
  },
  // Catch all unmatched routes
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
