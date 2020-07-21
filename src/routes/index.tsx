import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import SplashScreen from '../screens/SplashScreen';

const Routes = () => {
  const { signed, loading } = useAuth();
  if (loading) {
    return <SplashScreen />;
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
