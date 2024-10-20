import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';

export const PrivateRoute = ({ children } : { children: React.ReactNode }) => {

  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/home" />;
};