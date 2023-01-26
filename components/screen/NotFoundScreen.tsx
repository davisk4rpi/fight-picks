import React from 'react';
import { Text } from 'react-native-paper';

import { Translation } from '../../app-context';
import { Screen } from './Screen';

interface NotFoundScreenProps {
  thing: string;
  testID?: string;
}

export const NotFoundScreen = ({ thing, testID }: NotFoundScreenProps) => {
  return (
    <Screen testID={testID}>
      <Text>{Translation.sorryCouldntFindThat(thing)}</Text>
    </Screen>
  );
};
