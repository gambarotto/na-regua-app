import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import MainScreen from '../screens/MainScreen';
import FavoritiesScreen from '../screens/FavoritiesScreen';
import SchedulesScreen from '../screens/SchedulesScreen';
import TicketsScreen from '../screens/TicketsScreen';
import DetailScreen from '../screens/DetailScreen';

import { colors } from '../utils/styles';

import { StackParam, TabStack } from './types';

const Stack = createStackNavigator<StackParam>();

const Tab = createMaterialBottomTabNavigator<TabStack>();

// </NavigationContainer> está no app.tsx
function TabMainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';

          if (route.name === 'Main') {
            iconName = 'store';
          } else if (route.name === 'Favorities') {
            iconName = focused ? 'favorite' : 'favorite-border';
          } else if (route.name === 'Schedules') {
            iconName = 'schedule';
          } else if (route.name === 'Tickets') {
            iconName = 'card-giftcard';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
      backBehavior="initialRoute"
      activeColor={colors.orange}
      inactiveColor="#d7d1cb"
      barStyle={styleTab}
      keyboardHidesNavigationBar={true}>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Barbearias',
        }}
      />
      <Tab.Screen
        name="Favorities"
        component={FavoritiesScreen}
        options={{
          title: 'Favoritos',
        }}
      />
      <Tab.Screen
        name="Schedules"
        component={SchedulesScreen}
        options={{
          title: 'Agendamentos',
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          title: 'Cupons',
        }}
      />
    </Tab.Navigator>
  );
}

const styleTab = {
  backgroundColor: '#191d21',
};

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
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
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.data.name,
          headerStyle: {
            backgroundColor: '#222',
          },
          headerTitleAlign: 'center',
          headerTintColor: colors.secondaryColor,
          headerTitleStyle: {
            fontFamily: 'Anton-Regular',
          },
        })}
      />
      <Stack.Screen
        name="Main"
        component={TabMainScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
/**
 * tabBarOptions={{
        activeTintColor: '#191d21',
        inactiveTintColor: '#d7d1cb',
        activeBackgroundColor: '#d7d1cb',
        inactiveBackgroundColor: '#191d21',
        keyboardHidesTabBar: true,
        showLabel: true,
      }}
      // function DetailsStackScreen() {
//   return (
//     <StackDetail.Navigator>
//       <StackDetail.Screen name="Detail" component={DetailScreen} />
//       {/*<StackDetail.Screen name="Main" component={TabMainScreen} />*/
//     </StackDetail.Navigator>
//   );
// }
// const StackLogin = createStackNavigator();
// function LoginStackScreen() {
//   return (
//     <StackLogin.Navigator initialRouteName="Main" headerMode="none">
//       <StackLogin.Screen name="Login" component={LoginScreen} />
//       <StackLogin.Screen name="CreateAccount" component={CreateAccountScreen} />
//       {/*<StackLogin.Screen name="Main" component={TabMainScreen} />*/}
//     </StackLogin.Navigator>
//   );
// }
// */
