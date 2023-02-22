import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { NotFoundScreen } from '../../components';
import { useFightPickScreen } from './fight-pick-screen.hook';
import { LockedFightPicksScreen } from './LockedFightPicks';
import { UnlockedFightPicksScreen } from './UnlockedFightPicks';

type FightPickScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FightPick'
>;

export const FightPickScreen = ({ route }: FightPickScreenProps) => {
  const { fightId } = route.params;
  const { fight, mainCardDate } = useFightPickScreen(fightId);

  if (fight === undefined) {
    return <NotFoundScreen testID="FightPickScreen" thing={'Fight'} />;
  }

  if (new Date(mainCardDate) > new Date()) {
    return (
      <UnlockedFightPicksScreen fight={fight} mainCardDate={mainCardDate} />
    );
  } else {
    return <LockedFightPicksScreen fight={fight} mainCardDate={mainCardDate} />;
  }
};
