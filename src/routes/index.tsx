import React from 'react';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import SplashScreen from '../screens/SplashScreen';

const Routes = () => {
  const { loading } = useAuth();
  if (loading) {
    return <SplashScreen />;
  }
  return <AppRoutes />;
};

export default Routes;
