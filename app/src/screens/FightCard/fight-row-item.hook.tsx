import { useCallback } from 'react';

import {
  selectAuthUserFightPickByFightId,
  selectFightById,
  useAppSelector,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

export const useFightRowItem = (fightId: string) => {
  const { navigate } = useNavigation();
  const fight = useAppSelector(state => selectFightById(state, fightId));
  const fightPick = useAppSelector(state =>
    selectAuthUserFightPickByFightId(state, fightId),
  );

  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const navigateToFightPickScreen = useCallback(
    () => navigate('FightPick', { fightId: fightId }),
    [navigate, fightId],
  );

  return {
    navigateToFightPickScreen,
    fighter1: fighter1,
    fighter2: fighter2,
    fight,
    fightPick,
  };
};
