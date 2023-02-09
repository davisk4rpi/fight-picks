import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  FightCardScreen,
  FightPickScreen,
  LockedFightPicksScreen,
  LoginScreen,
} from '../screens';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import { BottomTabNavigator } from './BottomTabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator({ unauthorized }: { unauthorized: boolean }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      {true && unauthorized ? (
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
            name="LockedFightPicks"
            component={LockedFightPicksScreen}
            options={{ headerTitle: 'Locked Fight Picks' }}
          />
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
