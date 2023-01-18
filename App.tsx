import 'expo-dev-client';

import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { DarkTheme, LightTheme, PreferencesContext } from './app-context';
import GoogleServives from './google-services.json';
import useCachedResources from './hooks/useCachedResources';
import { useAuthenticatedUser } from './libs/react-native-firebase';
import Navigation from './navigation';

console.log(
  'LOGGGGGG',
  GoogleServives.client[0].oauth_client.find(
    ({ client_type }) => client_type === 3,
  )?.client_id,
);
GoogleSignin.configure({
  webClientId: GoogleServives.client[0].oauth_client.find(
    ({ client_type }) => client_type === 3,
  )?.client_id,
});

export default function App() {
  const { user, initializing: authInitializing } = useAuthenticatedUser();
  const isLoadingComplete = useCachedResources();
  const [isThemeDark, setIsThemeDark] = useState(true);

  let theme = isThemeDark ? DarkTheme : LightTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(prev => !prev);
  }, []);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        flex1: {
          flex: 1,
        },
      }),
    [theme],
  );
  if (!isLoadingComplete || authInitializing) {
    return null;
  } else {
    return (
      <SafeAreaProvider
        style={styles.screen}
        initialMetrics={initialWindowMetrics}>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <Navigation theme={theme} unauthorized={user === null} />
            <StatusBar />
          </PaperProvider>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    );
  }
}
