import React from 'react';
import { StyleSheet, View } from 'react-native';

import { LoadingScreen, Screen } from '../../../components';
import { useMigrationsScreen } from './migrations-screen.hook';

export interface MigrationsScreenProps {}

const TEST_ID = 'MigrationsScreen';

export const MigrationsScreen = ({}: MigrationsScreenProps) => {
  const { loading } = useMigrationsScreen();

  if (loading) {
    return <LoadingScreen testID={TEST_ID} />;
  }
  return (
    <Screen testID={TEST_ID}>
      <View style={styles.view} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
