import { useEffect, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Fighter, FightPickWithScore, User } from '../../../models.types';
import {
  PLACEHOLDER_USER,
  useFightCard,
  useFightPicksByFightId,
  useFightWithFighters,
  useUsersByUids,
} from '../../data-access';
import { calculatePickScores } from '../../libs/scoring';

export type FightPickWithUserAndScore = FightPickWithScore & {
  user: User;
  winningFighter: Fighter | null;
};

export const useLockedFightPicksScreen = (fightId: string) => {
  const { navigate } = useNavigation();
  const { fight, loading: fightLoading } = useFightWithFighters(fightId);
  const { fightCard } = useFightCard(fight?.fightCardId);
  const mainCardDateStamp = fightCard?.mainCardDate?.getTime();

  useEffect(() => {
    if (mainCardDateStamp === undefined) return;
    if (mainCardDateStamp > Date.now()) {
      navigate('FightPick', { fightId });
    }
  }, [mainCardDateStamp, fightId, navigate]);

  const { fightPicks, loading: fightPicksLoading } =
    useFightPicksByFightId(fightId);

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
          if (fightPick.winningFighterId === fight?.fighter1.id) {
            winningFighter = fight.fighter1;
          } else if (fightPick.winningFighterId === fight?.fighter2.id) {
            winningFighter = fight.fighter2;
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
    [userMapByUid, fightPicks, fight],
  );
  return {
    fight,
    fightPicks: fightPicksWithUserAndScore,
    loading: fightPicksLoading || fightLoading || userMapLoading,
  };
};
