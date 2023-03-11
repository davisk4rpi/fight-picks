import { useMemo } from 'react';

import { Fight, FightPickWithScore } from '@fight-picks/models';

import { useFightPicksByFightId } from '../../../data-access/hooks';
import {
  PLACEHOLDER_FIGHTER,
  useSelectFightersFromFight,
} from '../../../data-access/store';
import { calculatePickScore } from '../../../libs/scoring';

export const useLockedFightPickScreen = (fight: Fight) => {
  const { fightPicks, loading: fightPicksLoading } = useFightPicksByFightId(
    fight.id,
  );
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const fightPicksWithUserAndScore = useMemo(
    () =>
      fightPicks
        .map<FightPickWithScore>(fightPick => {
          const score = calculatePickScore(fightPick, fight?.result);
          return {
            ...fightPick,
            score,
          };
        })
        .sort((a, b) => {
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

          return -1;
        }),
    [fightPicks, fight?.result],
  );
  return {
    fightPicks: fightPicksWithUserAndScore,
    loading: fightPicksLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
  };
};
