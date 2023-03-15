import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../types';
import { Translation } from '../../app-context';
import { NotFoundScreen } from '../../components';
import { devEnv } from '../../environments';
import { EditFightPickScreen } from './EditFightPick';
import { useFightPickScreen } from './fight-pick-screen.hook';
import { LockedFightPickScreen } from './LockedFightPick';

type FightPickScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FightPick'
>;

const TEST_ID = 'FightPickScreen';

export const FightPickScreen = ({ route }: FightPickScreenProps) => {
  const { fightId } = route.params;
  const { fight, mainCardDate } = useFightPickScreen(fightId);

  if (fight === undefined) {
    return <NotFoundScreen testID={TEST_ID} thing={Translation.fight} />;
  }

  if (
    (__DEV__ && devEnv.allowLatePicks) ||
    new Date(mainCardDate) > new Date()
  ) {
    return <EditFightPickScreen fight={fight} mainCardDate={mainCardDate} />;
  } else {
    return <LockedFightPickScreen fight={fight} mainCardDate={mainCardDate} />;
  }
};
