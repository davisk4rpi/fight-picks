import { useMemo } from 'react';

import { Fight, MethodMap } from '@fight-picks/models';
import {
  PLACEHOLDER_FIGHTER,
  useFightPicksByFightId,
  useSelectFightersFromFight,
} from '@fight-picks/native-data-access';

import { addScoreToFightPicks } from '../../../libs/scoring';

export const useLockedFightPickScreen = (fight: Fight, noSpoilers: boolean) => {
  const { fightPicks, loading: fightPicksLoading } = useFightPicksByFightId(
    fight.id,
  );
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const fightPicksWithScore = useMemo(() => {
    const fightPicksWithScore = addScoreToFightPicks(
      fightPicks,
      noSpoilers ? undefined : fight?.result,
    );
    fightPicksWithScore.sort((a, b) => {
      if (a.score !== undefined && b.score !== undefined) {
        if (a.score < b.score) return 1;
        if (a.score === b.score) {
          const confidenceMultiplier = a.score > 0 ? 1 : -1;
          if (
            a.confidence * confidenceMultiplier <
            b.confidence * confidenceMultiplier
          ) {
            return 1;
          }
        }
      }
      if (b.method !== MethodMap.decision) {
        if (a.round === null) return 1;
        if (b.round > a.round) return 1;
        if (b.round === a.round && b.confidence > a.confidence) return 1;
      }
      return -1;
    });
    return fightPicksWithScore;
  }, [fightPicks, fight?.result, noSpoilers]);

  return {
    fightPicks: fightPicksWithScore,
    loading: fightPicksLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
  };
};
