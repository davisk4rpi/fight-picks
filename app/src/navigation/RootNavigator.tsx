import React, { useMemo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types';
import {
  AdminHomeScreen,
  FightCardScreen,
  FightPickScreen,
  LoginScreen,
  SettingsScreen,
} from '../screens';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigatorProps {
  isAdmin: boolean;
  unauthorized: boolean;
}

export function RootNavigator({ unauthorized, isAdmin }: RootNavigatorProps) {
  const initialParams = useMemo(() => ({ isAdmin }), [isAdmin]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      {unauthorized ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FightCard"
            component={FightCardScreen}
            options={{ headerTitle: 'Fight Card' }}
          />
          <Stack.Screen
            name="FightPick"
            component={FightPickScreen}
            options={{ headerTitle: 'Fight Pick' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            initialParams={initialParams}
          />
          {isAdmin && (
            <Stack.Group>
              <Stack.Screen
                name="AdminHome"
                component={AdminHomeScreen}
                options={{ headerTitle: 'Admin Home' }}
              />
            </Stack.Group>
          )}
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: 'Oops!' }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
