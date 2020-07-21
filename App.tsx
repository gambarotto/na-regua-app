import 'react-native-gesture-handler';
import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
