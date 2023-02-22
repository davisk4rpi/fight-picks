import { useMemo } from 'react';

import { Fight, Fighter, FightPickWithScore, User } from '@fight-picks/models';

import {
  PLACEHOLDER_USER,
  useFightPicksByFightId,
  useUsersByUids,
} from '../../../data-access/hooks';
import {
  PLACEHOLDER_FIGHTER,
  useSelectFightersFromFight,
} from '../../../data-access/store';
import { calculatePickScores } from '../../../libs/scoring';

export type FightPickWithUserAndScore = FightPickWithScore & {
  user: User;
  winningFighter: Fighter | null;
};

export const useLockedFightPicksScreen = (fight: Fight) => {
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
          const { score, confidenceScore } = calculatePickScores(
            fightPick,
            fight?.result,
          );
          let winningFighter: Fighter | null = null;
          if (fightPick.winningFighterId === fighter1?.id) {
            winningFighter = fighter1;
          } else if (fightPick.winningFighterId === fighter2?.id) {
            winningFighter = fighter2;
          }
          return {
            ...fightPick,
            user: userMapByUid.get(fightPick.userUid) ?? PLACEHOLDER_USER,
            score,
            confidenceScore,
            winningFighter,
          };
        })
        .sort((a, b) => {
          if (a.score !== undefined && b.score !== undefined) {
            if (a.score < b.score) return 1;
            if (
              a.score === b.score &&
              (a?.confidenceScore ?? -6) < (b?.confidenceScore ?? -6)
            )
              return 1;
          }

          return -1;
        }),
    [userMapByUid, fightPicks, fighter1, fighter2, fight?.result],
  );
  return {
    fightPicks: fightPicksWithUserAndScore,
    loading: fightPicksLoading || userMapLoading,
    fighter1: fighter1 ?? PLACEHOLDER_FIGHTER,
    fighter2: fighter2 ?? PLACEHOLDER_FIGHTER,
  };
};
