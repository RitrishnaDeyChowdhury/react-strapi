import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import usePreviousPath from './hooks/usePreviousPath';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const previous_path = usePreviousPath();
  if (!isAuthenticated) {
      return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
