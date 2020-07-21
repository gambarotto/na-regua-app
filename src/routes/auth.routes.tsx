import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

import { StackParam } from './types';

const Stack = createStackNavigator<StackParam>();

const AuthRoutes: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CreateAccount"
      component={CreateAccountScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AuthRoutes;
