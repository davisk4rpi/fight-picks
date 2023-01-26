import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Screen } from './Screen';

interface LoadingScreenProps {
  testID?: string;
}

export const LoadingScreen = ({ testID }: LoadingScreenProps) => {
  return (
    <Screen testID={testID}>
      <ActivityIndicator />
    </Screen>
  );
};
