import React from 'react';
import { Text } from 'react-native-paper';

import { Translation } from '../../app-context';
import { Screen } from './Screen';

interface NotFoundScreenProps {
  thing: string;
}

export const NotFoundScreen = ({ thing }: NotFoundScreenProps) => {
  return (
    <Screen>
      <Text>{Translation.sorryCouldntFindThat(thing)}</Text>
    </Screen>
  );
};
