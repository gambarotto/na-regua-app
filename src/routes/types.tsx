//import React from 'react';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { IBarbershop } from '../contexts/types-barbershop';
import { IBarber } from '../contexts/types-barber';
// export type LoginStack = {
//   Login: undefined;
//   CreateAccount: undefined;
//   Main: undefined;
// };
export type StackParam = {
  Login: undefined;
  CreateAccount: undefined;
  Main: undefined;
};
export type TabStack = {
  Main: undefined;
  Favorities: undefined;
  Schedules: undefined;
  Tickets: undefined;
};
export type StackTabDetail = {
  Detail: {
    data: {
      barbershop: IBarbershop;
      barbers: IBarber[];
    };
  };
  Main: TabStack;
};

export type DetailStackRouteProp = RouteProp<StackTabDetail, 'Detail'>;
type LoginStackNavigationProp = StackNavigationProp<StackParam>;
type DetailStackNavigationProp = StackNavigationProp<StackTabDetail>;
type TabStackNavigationProp = MaterialBottomTabNavigationProp<TabStack>;

export type PropsStack = {
  route: DetailStackRouteProp;
  navigation: CompositeNavigationProp<
    LoginStackNavigationProp,
    TabStackNavigationProp
  >;
};
export type PropsStackDetailTab = {
  route: DetailStackRouteProp;
  navigation: StackTabDetail;
};
