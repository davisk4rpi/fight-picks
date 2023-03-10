import { useMemo } from 'react';

import { Fight, FightPickWithScore, User } from '@fight-picks/models';

import {
  PLACEHOLDER_USER,
  useFightPicksByFightId,
  useUsersByUids,
} from '../../../data-access/hooks';
import {
  PLACEHOLDER_FIGHTER,
  useSelectFightersFromFight,
} from '../../../data-access/store';
import { calculatePickScore } from '../../../libs/scoring';

export type FightPickWithUserAndScore = FightPickWithScore & {
  user: User;
};

export const useLockedFightPickScreen = (fight: Fight) => {
  const { fightPicks, loading: fightPicksLoading } = useFightPicksByFightId(
    fight.id,
  );
  const { fighter1, fighter2 } = useSelectFightersFromFight(fight);

  const userUids = useMemo(
    () => fightPicks.map(({ userUid }) => userUid),
    [fightPicks],
  );

  const { userMapByUid, loading: userMapLoading } = useUsersByUids(userUids);

  const fightPicksWithUserAndScore = useMemo(
    () =>
      fightPicks
        .map<FightPickWithUserAndScore>(fightPick => {
          const score = calculatePickScore(fightPick, fight?.result);
          return {
            ...fightPick,
            user: userMapByUid.get(fightPick.userUid) ?? PLACEHOLDER_USER,
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
    [userMapByUid, fightPicks, fight?.result],
  );
  return {
    fightPicks: fightPicksWithUserAndScore,
    loading: fightPicksLoading || userMapLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
  };
};
