import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';
import Giveaway from '../features/Giveaway/pages/Giveaway.jsx';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute.jsx';

// createBrowserRouter router definition
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/giveaway" replace />,
  },
  // Public Guest-only Routes (redirect to /giveaway if already logged in)
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
  // Giveaway & Main Pages
  {
    path: '/giveaway',
    element: <Giveaway />,
  },
  {
    path: '/dashboard',
    element: <Giveaway />,
  },
  // Catch all unmatched routes
  {
    path: '*',
    element: <Navigate to="/giveaway" replace />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
