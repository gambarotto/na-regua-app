import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainScreen from '../screens/MainScreen';
import FavoritiesScreen from '../screens/FavoritiesScreen';
import SchedulesScreen from '../screens/SchedulesScreen';
import TicketsScreen from '../screens/TicketsScreen';
import DetailScreen from '../screens/DetailScreen';

import { AppProvider } from '../contexts/barbershops';
import { CustumerProvider } from '../contexts/custumer';

import { colors } from '../utils/styles';

import { TabStack, StackTabDetail } from './types';

const Tab = createMaterialBottomTabNavigator<TabStack>();
const AppStack = createStackNavigator<StackTabDetail>();

const styleTab = {
  backgroundColor: '#191d21',
};

function TabRoutes() {
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

const AppRoutes: React.FC = () => (
  <AppProvider>
    <CustumerProvider>
      <AppStack.Navigator initialRouteName="Main">
        <AppStack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Detalhes',
            headerStyle: {
              backgroundColor: '#222',
            },
            headerTitleAlign: 'center',
            headerTintColor: colors.secondaryColor,
            headerTitleStyle: {
              fontFamily: 'Anton-Regular',
            },
          }}
        />
        <AppStack.Screen
          name="Main"
          component={TabRoutes}
          options={{
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
    </CustumerProvider>
  </AppProvider>
);

export default AppRoutes;
