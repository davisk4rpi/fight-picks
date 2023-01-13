import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { DarkTheme, LightTheme, PreferencesContext } from './app-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [isThemeDark, setIsThemeDark] = useState(false);

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
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider
        style={styles.screen}
        initialMetrics={initialWindowMetrics}>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <Navigation theme={theme} />
            <StatusBar />
          </PaperProvider>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    );
  }
}
