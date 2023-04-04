import { useCallback, useMemo, useState } from 'react';

import { decodeFightResult, Fight } from '@fight-picks/models';
import {
  PLACEHOLDER_FIGHTER,
  useFightPicksByFightId,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';

import {
  addScoreToFightPicks,
  sortArrayByScoreAndConfidence,
} from '../../../libs/scoring';

export const useLockedFightPickScreen = (
  fight: Fight,
  _noSpoilers: boolean,
) => {
  const [noSpoilers, setNoSpoilers] = useState(_noSpoilers);
  const { fightPicks, loading: fightPicksLoading } = useFightPicksByFightId(
    fight.id,
  );
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const onToggleSpoliers = useCallback(() => setNoSpoilers(prev => !prev), []);

  const fightPicksWithScore = useMemo(() => {
    const fightPicksWithScore = addScoreToFightPicks(
      fightPicks,
      noSpoilers ? null : fight?.resultCode,
    );
    sortArrayByScoreAndConfidence(fightPicksWithScore);
    return fightPicksWithScore;
  }, [fightPicks, fight?.resultCode, noSpoilers]);

  const fightResult = useMemo(
    () => decodeFightResult(fight?.resultCode) ?? undefined,
    [fight?.resultCode],
  );

  return {
    fightPicks: fightPicksWithScore,
    loading: fightPicksLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
    fightResult: noSpoilers ? undefined : fightResult,
    onToggleSpoliers,
    noSpoilers,
  };
};
