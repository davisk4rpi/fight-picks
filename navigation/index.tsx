import React, { useMemo } from 'react';

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';

import {
  getAdaptedNavigationTheme,
  RefTheme,
} from './get-adapted-navigation-theme';
import { RootNavigator } from './RootNavigator';

export default function Navigation({ theme }: { theme: RefTheme }) {
  const navTheme = useMemo(() => getAdaptedNavigationTheme(theme), [theme]);

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
