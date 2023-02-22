import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Fight } from '../../../models.types';
import {
  PLACEHOLDER_FIGHTER,
  useSelectFightersFromFight,
} from '../../data-access/store';

export const useFightRowItem = (fight: Fight) => {
  const { navigate } = useNavigation();
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const navigateToFightPickScreen = useCallback(
    () => navigate('FightPick', { fightId: fight.id }),
    [navigate, fight.id],
  );

  return {
    navigateToFightPickScreen,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
  };
};
