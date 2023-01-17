import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { DummyEvent } from '../../data-access';

export const useNextEventScreen = () => {
  const { navigate } = useNavigation();

  const navigateToFightPickScreen = useCallback(
    (fightId: string) => {
      navigate('FightPick', { fightId });
    },
    [navigate],
  );

  return {
    event: DummyEvent,
    navigateToFightPickScreen,
  };
};
