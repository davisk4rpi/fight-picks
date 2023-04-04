import { useCallback, useMemo } from 'react';

import {
  useSelectCurrentUserFightPickByFightId,
  useSelectFightById,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';
import { useNavigation } from '@react-navigation/native';

import { decodeFightResult } from '@fight-picks/models';
import { FightCardScreenContext } from '../types';

export const useFightRowItem = (
  fightId: string,
  context: FightCardScreenContext,
) => {
  const { navigate } = useNavigation();
  const fight = useSelectFightById(fightId);
  const fightPick = useSelectCurrentUserFightPickByFightId(fightId);
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const navigateToFightPickScreen = useCallback(
    () =>
      navigate('FightPick', {
        fightId: fightId,
        noSpoilers: context === 'picks',
      }),
    [navigate, fightId, context],
  );

  const taleOfTheTapeResult = useMemo(() => {
    if (fight === undefined || fight.isCanceled || context === 'scores')
      return undefined;
    if (context === 'picks') {
      if (fightPick) {
        return decodeFightResult(fightPick?.resultCode);
      }
      return undefined;
    }
    return decodeFightResult(fight.resultCode) ?? undefined;
  }, [fight, fightPick, context]);

  return {
    navigateToFightPickScreen,
    fighter1: fighter1,
    fighter2: fighter2,
    fight,
    taleOfTheTapeResult,
    confidence: fightPick?.confidence,
  };
};
