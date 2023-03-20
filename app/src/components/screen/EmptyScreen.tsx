import React from 'react';
import { Text } from 'react-native-paper';

import { Screen } from './Screen';

interface EmptyScreenProps {
  testID?: string;
  message: string;
}

export const EmptyScreen = ({ testID, message }: EmptyScreenProps) => {
  return (
    <Screen testID={testID}>
      <Text variant="displayMedium" adjustsFontSizeToFit numberOfLines={1}>
        {message}
      </Text>
    </Screen>
  );
};
