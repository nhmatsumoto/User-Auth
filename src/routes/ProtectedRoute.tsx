import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';

export  const ProtectedRoute = ({ children } : { children: React.ReactNode }) => {

  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};